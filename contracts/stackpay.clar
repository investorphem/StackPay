;; StackPay Protocol — Mainnet v1.0
;; Optimized for gas efficiency and security

;; Constants & Error Codes
(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-AUTHORIZED (err u101))
(define-constant ERR-STREAM-NOT-FOUND (err u102))
(define-constant ERR-INSUFFICIENT-BALANCE (err u103))
(define-constant ERR-STREAM-INACTIVE (err u104))

;; Data Maps
(define-map streams
  uint 
  {
    employer: principal,
    employee: principal,
    rate-per-block: uint,
    last-withdraw-block: uint,
    balance: uint
    active: boo
  }
)

(define-data-var stream-idcounter uint u0)

;; --- Public Function ---

;; Create a new salarystream
(define-public (create-stream (employee principal) (rate-per-block uint) (fund uint))
  (let 
    (
      (id (+ (var-get stream-id-counter) u1))
    )
    ;; 1. Transfer STX to contract escrow
    (try! (stx-transfer? fund tx-sender (as-contract tx-sender)))
   
    ;; 2. Initialize the stream
    (map-set streams id
      {
        employer: tx-sender,
        employee: employee,
        rate-per-block: rate-per-block,
        last-withdraw-block: block-height,
        balance: fund,
        active: true
      }
    )
    
    ;; 3. Update counter
    (var-set stream-id-counter id)
    (ok id)
  )
)

;; Withdraw accrued salary
(define-public (withdraw (id uint))
  (let 
    (
      (stream (unwrap! (map-get? streams id) ERR-STREAM-NOT-FOUND))
      (blocks-passed (- block-height (get last-withdraw-block stream)))
      (accrued (* blocks-passed (get rate-per-block stream)))
      ;; Manual 'min' logic: can't withdraw more than the remaining balance
      (payable (if (>= accrued (get balance stream)) 
                  (get balance stream) 
                  accrued))
    )
    ;; Access Control
    (asserts! (is-eq tx-sender (get employee stream)) ERR-NOT-AUTHORIZED)
    (asserts! (get active stream) ERR-STREAM-INACTIVE)
    (asserts! (> payable u0) (ok u0)) ;; Return early if nothing to pay

    ;; 1. Transfer from contract to employee
    (try! (as-contract (stx-transfer? payable tx-sender (get employee stream))))
    
    ;; 2. Update state
    (map-set streams id
      (merge stream {
        last-withdraw-block: block-height,
        balance: (- (get balance stream) payable),
        active: (if (>= payable (get balance stream)) false true) ;; Auto-close if empty
      })
    )
    (ok payable)
  )
)

;; Cancel/Refund Stream (Employer only)
(define-public (cancel-stream (id uint))
  (let 
    (
      (stream (unwrap! (map-get? streams id) ERR-STREAM-NOT-FOUND))
      (remaining (get balance stream))
    )
    (asserts! (is-eq tx-sender (get employer stream)) ERR-NOT-AUTHORIZED)
    
    ;; 1. Refund remaining balance
    (if (> remaining u0)
      (try! (as-contract (stx-transfer? remaining tx-sender (get employer stream))))
      true
    )
    
    ;; 2. Close stream
    (map-set streams id (merge stream { balance: u0, active: false }))
    (ok true)
  )
)

;; --- Read-Only Functions ---

(define-read-only (get-stream (id uint))
  (map-get? streams id)
)

;; Fetching Multiple Streams (Gas-Optimized)
;; Note: Frontend should pass a list of IDs it wants to check
(define-read-only (get-streams-batch (ids (list 50 uint)))
  (map get-stream ids)
)

;; Get Global Stats
(define-read-only (get-total-streams)
  (var-get stream-id-counter)
)
