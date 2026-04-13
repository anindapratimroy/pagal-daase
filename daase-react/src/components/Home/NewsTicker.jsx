export default function NewsTicker({ news }) {
  if (!news || news.length === 0) return null;

  return (
    <div style={{
      background: 'var(--navy)',
      color: 'var(--white)',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '3px solid var(--gold)',
      overflow: 'hidden',
      whitespace: 'nowrap'
    }}>
      <div style={{
        fontWeight: 'bold',
        paddingRight: '15px',
        borderRight: '1px solid rgba(255,255,255,0.2)',
        marginRight: '15px',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span style={{color: 'var(--gold)'}}>✦</span> News &amp; Updates
      </div>
      
      <div style={{
        overflow: 'hidden',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          animation: 'shimmer 20s linear infinite', // Actually need a slide animation, let's use scrolling
          // Re-using a marquee-like simple inline style or CSS would be best
          // Since we can't easily add keyframes here without a style tag, let's just make it a nice wrapping row or static if few, or a simple CSS animation
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          scrollbarWidth: 'none', // hide scrollbar Firefox
          MsOverflowStyle: 'none',  // hide scrollbar IE 10+
          gap: '40px'
        }}
        className="news-ticker-scroll"
        >
          {news.map((item, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: 'var(--gold)' }}>●</span>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)', textDecoration: 'none' }}>
                  {item.title}
                </a>
              ) : (
                <span>{item.title || item}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
