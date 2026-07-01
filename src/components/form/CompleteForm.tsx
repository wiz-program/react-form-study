function CompleteForm({ message, onBack }: { message: string; onBack: () => void }) {
  return (
    <div className="form-page">
      <div className="form-container">
        <header className="form-header">
          <h1>応募完了</h1>
        </header>

        <div className="complete-body">
          <p className="complete-icon" aria-hidden="true">✓</p>
          <p className="complete-message">{message}</p>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="form-button form-button--primary"
            onClick={onBack}
          >
            もう一度応募する
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompleteForm
