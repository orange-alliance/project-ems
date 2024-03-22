import { FC, LazyExoticComponent, ReactNode, lazy } from 'react';

// Home route
const HomeApp = lazy(() => import('./apps/index'));

// Event routes
const EventSelection = lazy(() =>
  import('./apps/events').then((m) => ({ default: m.EventSelection }))
);
const EventCreation = lazy(() =>
  import('./apps/events').then((m) => ({ default: m.EventCreation }))
);
const EventManager = lazy(() =>
  import('./apps/events').then((m) => ({ default: m.EventManager }))
);

// Team Routes
const TeamManager = lazy(() =>
  import('./apps/teams').then((m) => ({ default: m.TeamManager }))
);
const TeamEditor = lazy(() =>
  import('./apps/teams').then((m) => ({ default: m.TeamEdior }))
);

// Tournament Routes
const TournamentManager = lazy(() =>
  import('./apps/tournaments').then((m) => ({ default: m.TournamentManager }))
);
const TournamentEditor = lazy(() =>
  import('./apps/tournaments').then((m) => ({ default: m.TournamentEditor }))
);

const SettingsApp = lazy(() => import('./apps/Settings'));
const GlobalSettingsApp = lazy(() => import('./apps/Settings/GlobalSettings'));

const MatchManager = lazy(() => import('./apps/MatchManager'));
const ScoringApp = lazy(() => import('./apps/Scoring'));
const AudienceDisplay = lazy(() => import('./apps/AudienceDisplay'));
const RefereeApp = lazy(() => import('./apps/Referee/Referee'));
const RedReferee = lazy(() => import('./apps/Referee/RedReferee'));
const BlueReferee = lazy(() => import('./apps/Referee/BlueReferee'));
const HeadReferee = lazy(() => import('./apps/Referee/HeadReferee'));
const Reports = lazy(() => import('./apps/Reports'));
const AdminApp = lazy(() => import('./apps/Admin'));
const FrcFmsFieldMonitorApp = lazy(() => import('./apps/FrcFmsFieldMonitor'));
const QueueingDisplay = lazy(() => import('./apps/QueueingDisplay'));
const JBApp = lazy(() => import('./apps/JBApp'));
const Streaming = lazy(() => import('./apps/Streaming/Streaming'));
const AudienceDisplayManager = lazy(
  () => import('./apps/AudienceDisplayManager')
);
// const AccountManager = lazy(() => import('./apps/AccountManager'));
// const RefereeApp = lazy(() => import('./apps/Referee/Referee'));
// const ScoreKeeper = lazy(() => import('./apps/Referee/ScoreKeeper'));
// const HeadReferee = lazy(() => import('./apps/Referee/HeadReferee'));
// const FieldDebugger = lazy(() => import('./apps/FieldDebugger'));

// Season specific apps
// const FRC2024_HumanPlayer = lazy(
//   () => import('./apps/SeasonSpecific/frc_2024/HumanPlayer')
// );

import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
export interface AppRoute {
  name: string;
  path: string;
  group: number;
  element: LazyExoticComponent<FC>;
  icon?: ReactNode;
  hidden?: boolean;
  routes?: AppRoute[];
  exact?: boolean;
}

const AppRoutes: AppRoute[] = [
  {
    name: 'Event Selection',
    path: '/',
    group: 0,
    element: EventSelection,
    icon: <EventIcon />,
    hidden: true
  },
  {
    name: 'Event Creation',
    path: '/create-event',
    group: 0,
    element: EventCreation,
    icon: <EventIcon />,
    hidden: true
  },
  {
    name: 'Event Manager',
    path: '/:eventKey/event-manager',
    group: 0,
    element: EventManager,
    icon: <EventIcon />
  },
  {
    name: 'Event Home',
    path: '/:eventKey',
    group: 0,
    element: HomeApp,
    icon: <HomeIcon />,
    hidden: true
  },
  {
    name: 'Team Manager',
    path: '/:eventKey/team-manager',
    group: 0,
    element: TeamManager,
    icon: <HomeIcon />
  },
  {
    name: 'Team Editor',
    path: '/:eventKey/team-manager/edit/:teamKey',
    group: 0,
    element: TeamEditor,
    icon: <HomeIcon />,
    hidden: true
  },
  {
    name: 'Tournament Manager',
    path: '/:eventKey/tournament-manager',
    group: 0,
    element: TournamentManager,
    icon: <HomeIcon />
  },
  {
    name: 'Tournament Editor',
    path: '/:eventKey/tournament-manager/edit/:tournamentKey',
    group: 0,
    element: TournamentEditor,
    icon: <HomeIcon />
  },
  {
    name: 'Match Manager',
    path: '/:eventKey/match-manager',
    group: 0,
    element: MatchManager,
    hidden: true
  },
  {
    name: 'Scoring App',
    path: '/:eventKey/scoring',
    group: 0,
    element: ScoringApp
  },
  {
    name: 'Settings',
    path: '/:eventKey/settings',
    group: 0,
    element: SettingsApp
  },
  {
    name: 'Audience Display',
    path: '/:eventKey/audience',
    group: 0,
    element: AudienceDisplay
  },
  {
    name: 'Referee App',
    path: '/:eventKey/referee',
    group: 0,
    element: RefereeApp
  },
  {
    name: 'Red Referee Page',
    path: '/:eventKey/referee/red',
    group: 0,
    element: RedReferee,
    hidden: true
  },
  {
    name: 'Blue Referee Page',
    path: '/:eventKey/referee/blue',
    group: 0,
    element: BlueReferee,
    hidden: true
  },
  {
    name: 'Head Referee Page',
    path: '/:eventKey/referee/head',
    group: 0,
    element: HeadReferee,
    hidden: true
  },
  {
    name: 'Reports App',
    path: '/:eventKey/reports',
    group: 0,
    element: Reports
  },
  {
    name: 'Admin App',
    path: '/:eventKey/admin',
    group: 0,
    element: AdminApp
  },
  {
    name: 'Settings',
    path: '/:eventKey/settings',
    group: 0,
    element: SettingsApp
  },
  {
    name: 'Settings',
    path: '/global-settings',
    group: 0,
    element: GlobalSettingsApp,
    hidden: true
  },
  {
    name: 'FRC FMS Field Monitor',
    path: '/frc/fms/fieldmonitor',
    group: 0,
    element: FrcFmsFieldMonitorApp,
    hidden: true
  },
  {
    name: 'Queueing Display',
    path: '/:eventKey/queueing',
    group: 0,
    element: QueueingDisplay
  },
  {
    name: 'JB App',
    path: '/:eventKey/jb',
    group: 0,
    element: JBApp,
    hidden: true
  },
  {
    name: 'Streaming',
    path: '/:eventKey/streaming',
    group: 0,
    element: Streaming
  },
  {
    name: 'Audience Display Manager',
    path: '/audience-display-manager',
    group: 0,
    element: AudienceDisplayManager
  }
  // {
  //   name: 'Account Manager',
  //   path: '/accounts',
  //   group: 0,
  //   element: <AccountManager />,
  //   hidden: false
  // },
  // {
  //   name: 'Field Debugger',
  //   path: '/fcs-debug',
  //   group: 0,
  //   element: <FieldDebugger />,
  //   hidden: true
  // },
];

export default AppRoutes;
