import { useRef } from 'react';

/**
 * Reusable, accessible search bar with glassmorphic styling,
 * clear button, and result count indicator.
 */
export default function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  resultCount = null,
  className = '',
  id = 'site-search-input',
}) {
  const inputRef = useRef(null);

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const hasQuery = Boolean(value && value.trim().length > 0);

  return (
    <div className={`search-bar-container ${className}`.trim()}>
      <div className={`search-bar-inner ${hasQuery ? 'has-query' : ''}`}>
        <span className="search-bar-icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          ref={inputRef}
          id={id}
          type="text"
          className="search-bar-input"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
          spellCheck="false"
        />

        {hasQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            title="Clear search (Esc)"
            aria-label="Clear search input"
          >
            ✕
          </button>
        )}
      </div>

      {hasQuery && resultCount !== null && (
        <div className="search-meta-bar" role="status" aria-live="polite">
          <span className="search-match-text">
            {resultCount === 0 ? (
              <>No matches found for <strong className="search-query-hl">"{value}"</strong></>
            ) : (
              <>
                Found <span className="search-match-count">{resultCount}</span> {resultCount === 1 ? 'match' : 'matches'} for <strong className="search-query-hl">"{value}"</strong>
              </>
            )}
          </span>
          <button
            type="button"
            className="search-reset-link"
            onClick={handleClear}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
