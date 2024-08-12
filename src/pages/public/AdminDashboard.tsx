
const AdminDashboard: React.FC = () => {
  const styles: Record<string, React.CSSProperties> = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f5f5f5',
    },
    dashboard: {
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      background: '#ffffff',
      textAlign: 'center',
      fontSize: '2.5em',
      fontWeight: 'bold',
      color: '#007bff',
    },
    accentText: {
      color: '#e44d26',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        Welcome to <span style={styles.accentText}>User Dashboard</span>
      </div>
    </div>
  );
};

export default AdminDashboard;
