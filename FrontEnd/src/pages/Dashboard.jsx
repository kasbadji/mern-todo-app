import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import StatsPage from './StatsPage';
import HistoryPage from './HistoryPage';

// Import your Todo page
import TodoUI from './TodoUI';

const NAVIGATION = [
  { kind: 'header', title: 'Main' },
  { segment: 'tasks', title: 'My Tasks', icon: <ListIcon /> },
  { segment: 'stats', title: 'Statistics', icon: <BarChartIcon /> },
  { segment: 'history', title: 'History', icon: <HistoryIcon /> },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

function PageContent({ pathname }) {
  if (pathname === '/tasks') return <TodoUI />;
  if (pathname === '/stats') return <StatsPage />;
  if (pathname === '/history') return <HistoryPage />;
  return <Typography variant="h5">Dashboard content for {pathname}</Typography>;
}


PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard() {
  const router = useDemoRouter('/tasks'); // default open page

  return (
    <DemoProvider>
      <AppProvider navigation={NAVIGATION} router={router} theme={theme}>
        <DashboardLayout>
          <PageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

export default Dashboard;
