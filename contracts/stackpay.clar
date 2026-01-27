;; StackPay — Payroll & Salary Streaming

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

;; Create a new salary stream
(define-public (create-stream (employee principal) (rate-per-block uint) (fund uint))
  (let ((id (+ (var-get stream-id-counter) u1)))
    ;; Transfer STX from employer to contract
    (try! (stx-transfer? fund tx-sender (as-contract tx-sender)))
    ;; Store stream data
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
    ;; Increment stream ID counter
    (var-set stream-id-counter id)
    (ok id)
  )
)

;; Withdraw accrued salary for a stream
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
        ;; Refund remaining balance to employer
        (try! (stx-transfer? (get balance stream) (as-contract tx-sender) (get employer stream)))
        ;; Mark stream inactive
        (map-set streams
          { id: id }
          (merge stream { balance: u0, active: false })
        )
        (ok true)
      )
      (err u4)
    )
  )
)

;; Add funds to an existing stream (top-up)
(define-public (fund-stream (id uint) (amount uint))
  (let ((s (map-get? streams { id: id })))
    (match s stream
      (begin
        (asserts! (is-eq tx-sender (get employer stream)) (err u5))
        (asserts! (get active stream) (err u6))
        ;; Transfer additional STX to contract
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        ;; Update stream balance
        (map-set streams
          { id: id }
          (merge stream { balance: (+ (get balance stream) amount) })
        )
        (ok true)
      )
      (err u7)
    )
  )
)

;; Create multiple streams in one transaction (up to 10)
(define-private (create-stream-internal (stream-data { employee: principal, rate-per-block: uint, fund: uint }))
  (let ((id (+ (var-get stream-id-counter) u1)))
    ;; Transfer STX from employer to contract
    (try! (stx-transfer? (get fund stream-data) tx-sender (as-contract tx-sender)))
    ;; Store stream data
    (map-set streams
      { id: id }
      {
        employer: tx-sender,
        employee: (get employee stream-data),
        rate-per-block: (get rate-per-block stream-data),
        last-withdraw-block: block-height,
        balance: (get fund stream-data),
        active: true
      }
    )
    ;; Increment stream ID counter
    (var-set stream-id-counter id)
    (ok id)
  )
)

(define-public (create-multiple-streams (streams-list (list 10 { employee: principal, rate-per-block: uint, fund: uint })))
  (ok (map create-stream-internal streams-list))
)

;; Withdraw from multiple streams in one transaction
(define-private (withdraw-internal (id uint))
  (let ((s (map-get? streams { id: id })))
    (match s stream
      (begin
        (asserts! (is-eq tx-sender (get employee stream)) (err u1))
        (let (
          (blocks (- block-height (get last-withdraw-block stream)))
          (amount (* blocks (get rate-per-block stream)))
          (payable (min amount (get balance stream)))
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

(define-public (withdraw-multiple (ids (list 10 uint)))
  (ok (map withdraw-internal ids))
)

;; Bulk operations for employers (create, fund, cancel)
(define-private (execute-operation (op { type: (string-ascii 10), employee: principal, rate-per-block: uint, fund: uint, stream-id: uint, amount: uint }))
  (let ((op-type (get type op)))
    (if (is-eq op-type "create")
      (create-stream (get employee op) (get rate-per-block op) (get fund op))
      (if (is-eq op-type "fund")
        (fund-stream (get stream-id op) (get amount op))
        (if (is-eq op-type "cancel")
          (cancel-stream (get stream-id op))
          (err u8) ;; Invalid operation type
        )
      )
    )
  )
)

(define-public (execute-bulk-operations (operations (list 10 { type: (string-ascii 10), employee: principal, rate-per-block: uint, fund: uint, stream-id: uint, amount: uint })))
  (ok (map execute-operation operations))
)

;; Read-only function to fetch all active streams
(define-read-only (get-all-streams)
  (begin
    (define streams-list (list))
    (define counter (var-get stream-id-counter))

    (define (loop i acc)
      (if (> i counter)
          acc
          (let ((s (map-get? streams { id: i })))
            (if (and s (get active s))
                (loop (+ i u1) (cons s acc))
                (loop (+ i u1) acc)
            )
          )
      )
    )

    (loop u1 streams-list)
  )
)
