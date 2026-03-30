const TD = { 
  padding: '12px', 
  borderBottom: '1px solid var(--border-color)', 
  verticalAlign: 'middle',
  color: 'var(--text-secondary)',
  fontSize: '13px',
  transition: 'all 0.3s ease'
}

export default function Table1({ 
  rows, 
  columns, 
  onView, 
  onEdit, 
  onDelete,
  showView = false,
  showEdit = false,
  showDelete = false,
  customActions = null // For custom action buttons
}) {
  // Check if any action buttons should be shown
  const hasAnyActions = showView || showEdit || showDelete || customActions
  
  return (
    <div className="table-container" style={{ overflowX: 'auto' }}>
      <table className="admin-table" style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        fontFamily: "'Barlow', sans-serif" 
      }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ 
                textAlign: col.align || 'left', 
                padding: '8px 12px', 
                fontSize: '10px',
                color: 'var(--text-muted)', 
                letterSpacing: '0.12em', 
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-color)', 
                whiteSpace: 'nowrap',
                width: col.width || 'auto',
                fontWeight: 600,
                transition: 'color 0.3s ease'
              }}>
                {col.label}
              </th>
            ))}
            {hasAnyActions && (
              <th style={{ 
                textAlign: 'center', 
                padding: '8px 12px', 
                fontSize: '10px',
                color: 'var(--text-muted)', 
                letterSpacing: '0.12em', 
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-color)', 
                whiteSpace: 'nowrap',
                width: '100px'
              }}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index} className="table-row">
              {columns.map(col => (
                <td key={col.key} style={TD}>
                  {col.render ? col.render(row[col.key], row) : (
                    <span style={{ 
                      fontSize: col.fontSize || '13px', 
                      color: col.color || 'var(--text-secondary)',
                      fontWeight: col.fontWeight || 'normal'
                    }}>
                      {row[col.key]}
                    </span>
                  )}
                </td>
              ))}
              {hasAnyActions && (
                <td style={{ ...TD, textAlign: 'center' }}>
                  {customActions ? (
                    customActions(row)
                  ) : (
                    <div className="action-buttons" style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      justifyContent: 'center' 
                    }}>
                      {showView && onView && (
                        <button
                          onClick={() => onView(row)}
                          className="action-btn view-btn"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            color: 'var(--gold)',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--nav-hover)'
                            e.currentTarget.style.transform = 'scale(1.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                          title="View"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                      )}
                      {showEdit && onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="action-btn edit-btn"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            color: '#4CAF50',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.1)'
                            e.currentTarget.style.transform = 'scale(1.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                          title="Edit"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                            <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                            <path d="M4 20h16" />
                          </svg>
                        </button>
                      )}
                      {showDelete && onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="action-btn delete-btn"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            color: '#f44336',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(244, 67, 54, 0.1)'
                            e.currentTarget.style.transform = 'scale(1.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                          title="Delete"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                            <path d="M4 7h16" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M5 7l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
                            <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}