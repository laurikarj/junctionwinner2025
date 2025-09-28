import React from 'react';
// FontAwesome search icon is used directly in JSX
import AnalyticsPage from './components/AnalyticsPage';
import MapView from './components/MapView';
import LoginPage from './components/LoginPage';
// import InfoCards from './components/InfoCards';
import veologo from './veologo.png';
import './App.css';




function App() {
    const [userEmail, setUserEmail] = React.useState(null);
    // FAB state for map
    const [fabOpen, setFabOpen] = React.useState(false);
    const [currentPosition, setCurrentPosition] = React.useState(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [page, setPage] = React.useState('map');
    // Searchbar toggle
    const [showSearchBar, setShowSearchBar] = React.useState(false);
    // List of Finnish presidents
    const finnishPresidents = [
        'Kaarlo Juho Ståhlberg',
        'Lauri Kristian Relander',
        'Pehr Evind Svinhufvud',
        'Kyösti Kallio',
        'Risto Heikki Ryti',
        'Carl Gustaf Emil Mannerheim',
        'Juho Kusti Paasikivi',
        'Urho Kaleva Kekkonen',
        'Mauno Henrik Koivisto',
        'Martti Oiva Kalevi Ahtisaari',
        'Tarja Kaarina Halonen',
        'Sauli Väinämö Niinistö',
        'Cai-Göran Alexander Stubb'
    ];
    // Profile state for icon color (hue) and name
    const [profile, setProfile] = React.useState({
        name: '',
        hue: 200, // default hue (blue)
        email: null,
    });
    const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
    // Set default name to a random Finnish president on first render
    React.useEffect(() => {
        setProfile(p => {
            if (!p.name) {
                const randomPresident = finnishPresidents[Math.floor(Math.random() * finnishPresidents.length)];
                return { ...p, name: randomPresident };
            }
            return p;
        });
        // eslint-disable-next-line
    }, []);

    // Set email in profile when user logs in
    React.useEffect(() => {
        if (userEmail) {
            setProfile(p => ({ ...p, email: userEmail }));
        }
    }, [userEmail]);
    // ...existing code...
    // Hide all Leaflet controls when menu is open
    React.useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('leaflet-hide-controls');
        } else {
            document.body.classList.remove('leaflet-hide-controls');
        }
    }, [menuOpen]);
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCurrentPosition([pos.coords.latitude, pos.coords.longitude]);
                },
                () => {},
                { enableHighAccuracy: true }
            );
        }
    }, []);
    // Set overflowY: auto only for analytics page, otherwise hidden
    const headerHeight = 64;
    const mainDivStyle = {
        fontFamily: 'Segoe UI, Arial, sans-serif',
        background: '#f5f7fa',
        minHeight: '100vh',
        overflow: 'hidden',
        paddingTop: headerHeight,
    };
    const analyticsContainerStyle = {
        height: 'calc(100vh - 73px)', // 73px = header height
        overflowY: 'auto',
    };
    const header = (
        <header style={{ background: '#009fe3', color: '#fff', padding: '8px 8px 3px 8px', boxShadow: '0 6px 24px 0 rgba(0,0,0,0.18)', borderBottom: '1px solid #007bb8', zIndex: 1000, position: 'fixed', top: 0, left: 0, width: '100%', appRegion: 'drag', textSelect: 'none', minHeight: headerHeight }}>
            <div style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 3001 }}>
                    <img src={veologo} alt="VEO Logo" style={{ height: 48, width: 'auto', display: 'block', background: '#fff', padding: 4, borderRadius: 8, boxShadow: '0 1.5px 8px 0 rgba(0,0,0,0.13)' }} />
                    <span className="powerpulse-title" style={{ fontSize: 36, fontWeight: 700, letterSpacing: 2, fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', marginRight: 20 }}>PowerPulse</span>
                </div>
            </div>
        </header>
    );
    if (!userEmail) {
        return <>
            {header}
            <LoginPage onLogin={setUserEmail} />
        </>;
    }
    return (
        <>
            {/* CSS moved to App.css */}
            <div style={mainDivStyle}>
                <header style={{ background: '#009fe3', color: '#fff', padding: '8px 8px 3px 8px', boxShadow: '0 6px 24px 0 rgba(0,0,0,0.18)', borderBottom: '1px solid #007bb8', zIndex: 1000, position: 'fixed', top: 0, left: 0, width: '100%', appRegion: 'drag', textSelect: 'none', minHeight: headerHeight }}>
                    <div style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative' }}>
                        <div className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((open) => !open)} style={{ appRegion: 'no-drag' }}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 3001 }}>
                            <img src={veologo} alt="VEO Logo" style={{ height: 48, width: 'auto', display: 'block', background: '#fff', padding: 4, borderRadius: 8, boxShadow: '0 1.5px 8px 0 rgba(0,0,0,0.13)' }} />
                            <span className="powerpulse-title" style={{ fontSize: 36, fontWeight: 700, letterSpacing: 2, fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', marginRight: 20 }}>PowerPulse</span>

                        </div>
                                            {/* Search icon button, bottom right of header */}
                    <button
                        aria-label="Toggle search bar"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontSize: 26,
                            cursor: 'pointer',
                            padding: 4,
                            borderRadius: 6,
                            transition: 'background 0.2s',
                            position: 'absolute',
                            right: 16,
                            bottom: -10,
                            zIndex: 4002,
                            appRegion: 'no-drag',
                            height: 40,
                            width: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={() => setShowSearchBar(v => !v)}
                        title="Search"
                    >
                        <i className="fa fa-search" style={{ fontSize: 24, color: '#fff', margin: 0 }}></i>
                    </button>
                        <nav style={{ position: 'relative' }}>
                            <ul
                                className={`powerpulse-menu${menuOpen ? ' open' : ''}`}
                                style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0, fontSize: 18, appRegion: 'no-drag', position: 'relative', top: 5 }}
                                onClick={() => setMenuOpen(false)}
                            >
                                <li
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: page === 'map' ? 700 : 400,
                                        opacity: page === 'map' ? 1 : 0.85
                                    }}
                                    onClick={() => setPage('map')}
                                >
                                    Map
                                </li>
                                <li
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: page === 'analytics' ? 700 : 400,
                                        opacity: page === 'analytics' ? 1 : 0.85
                                    }}
                                    onClick={() => setPage('analytics')}
                                >
                                    Analytics
                                </li>
                                 {/* <li style={{ cursor: 'pointer' }}>Settings</li> */}
                                <li
                                    style={{ cursor: 'pointer' }}
                                    onClick={e => {
                                        setPage('map');
                                        if (window.setShowSiteDialog) window.setShowSiteDialog(false);
                                        setProfileMenuOpen(true);
                                    }}
                                >
                                    Profile
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                {page === 'map' && (
                    <>
                        <MapView
                            fabOpen={fabOpen}
                            setFabOpen={setFabOpen}
                            currentPosition={currentPosition}
                            setCurrentPosition={setCurrentPosition}
                            menuOpen={menuOpen}
                            profile={profile}
                            setProfile={setProfile}
                            profileMenuOpen={profileMenuOpen}
                            setProfileMenuOpen={setProfileMenuOpen}
                            setShowSiteDialog={fn => { window.setShowSiteDialog = fn; }}
                            showSearchBar={showSearchBar}
                            setShowSearchBar={setShowSearchBar}
                            onLogout={() => setUserEmail(null)}
                        />
                    </>
                )}
                {page === 'analytics' && (
                    <div style={analyticsContainerStyle}>
                        <AnalyticsPage />
                    </div>
                )}
            </div>
        </>
    );
}

export default App;