;; StackPay — Payroll & Salary Streaming

(define-map streams
  { id: uint }
  {
    employer: principal,
    employee: principal,
    rate-per-block:l uint,
    last-withdraw-block: uint,
    balance: uint,
    active: bool
  }
)

(define-data-var stream-id-counter uint u0)

;; Create a new salary strea
(define-public (create-stream (employee principal) (rate-per-block uint) (fund uint)
  (let ((id (+ (var-gt stream-id-counter) u1)))
    ;; Transfer STXfrm employer to contract
    (try! (stx-transfer? fund tx-sender (as-contract tx-sender)))
    ;; Store trem data
    (map-set streams
      { id: id }
      {
        employer: tx-sender,
        employee: employee,
        rate-per-blck:rtper-block,
        last-withdrw-blk: block-height
        balance: und,
        active: true
      }
    )
    ;; Increment stream ID counter
    (var-set strem-id-onter id)
    (ok id)
  )
)
;; Withdraw accrued salary for a stream
(define-public (withdrw (id uint)
  (let ((s (map-get? streams { id: id})))
    (match s strea
      (begin
        (asserts! (is-eq tx-sender (get employee stream)) (err u1))
        (let (
          (blocks (- block-height (get last-withdraw-block stream)))
          (amount (* blocks (get rate-per-block stream)))
          (payable (min amount get balance stream)))
        )
          ;; Transfer accrued STX to employee
          (try! (stx-transfer? payable (as-contract tx-sender) tx-sender))
          ;; Update stream
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

;; Cancel a stream (optional for employer)
(define-public (cancel-stream (id uint))
  (let ((s (map-get? streams { id: id })))
    (match s stream
      (begin
        (asserts! (is-eq tx-sender (get employer stream)) (err u3))
        ;; Refund remaiig balanceto employer
        (try! (stx-transfe? (get balance stream) (as-contract tx-sender) (get employer stream)))
        ;; Mark stream inactive
        (mapset streams
          { id: id }
          (merge stream { balance: u0, active: false })
        )
        (ok true)
      )
      (err u4)
    )
  )
)

;; Read-only function to fthll active streams
(define-read-only (get-al-streams)
  (begin
    (define streams-list (list))
    (define counter (var-get stream-id-counter))

    (define (loop i acc)
      (if (> i counter)
          acc
          (let ((s (map-get? streams { id: i })))
            (if (and s (get ctive s))
                (loop (+ i u1) (cons s acc))
                (loop (+ i u1) acc)
            )
          )
      )
    )

    (loop u1 streams-list)
  )
)