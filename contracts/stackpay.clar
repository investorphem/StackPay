(define-map streams
  { id: uint }
  {
    employer: principal,
    employee: principal,
    rate-per-block: uint,
    last-withdraw-block: uint,
    balance: uint,
    active: bool
  }
)

(define-data-var stream-id-counter uint u0)

(define-public (create-stream (employee principal) (rate-per-block uint) (fund uint))
  (let ((id (+ (var-get stream-id-counter) u1)))
    (try! (stx-transfer? fund tx-sender (as-contract tx-sender)))
    (map-set streams
      { id: id }
      {
        employer: tx-sender,
        employee: employee,
        rate-per-block: rate-per-block,
        last-withdraw-block: block-height,
        balance: fund,
        active: true
      }
    )
    (var-set stream-id-counter id)
    (ok id)
  )
)

(define-public (withdraw (id uint))
  (let ((s (map-get? streams { id: id })))
    (match s stream
      (begin
        (asserts! (is-eq tx-sender (get employee stream)) (err u1))
        (let (
          (blocks (- block-height (get last-withdraw-block stream)))
          (amount (* blocks (get rate-per-block stream)))
          (payable (min amount (get balance stream)))
        )
          (try! (stx-transfer? payable (as-contract tx-sender) tx-sender))
          (map-set streams
            { id: id }
            (merge stream {
              last-withdraw-block: block-height,
              balance: (- (get balance stream) payable)
            })
          )
          (ok payable)
        )
      )
      (err u2)
    )
  )
)