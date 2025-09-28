import { useState, useEffect, useCallback } from 'react';

// Custom hook for managing sites with backend + localStorage fallback
export default function useSites() {
    const LS_KEY = 'sites';
    const [sites, setSites] = useState([]);

    // Helpers for localStorage
    const saveSitesToLocal = useCallback((sites) => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(sites));
        } catch {}
    }, []);
    const loadSitesFromLocal = useCallback(() => {
        try {
            const data = localStorage.getItem(LS_KEY);
            return data ? JSON.parse(data) : [];
        } catch { return []; }
    }, []);

    // Load sites from backend on mount, fallback to localStorage
    useEffect(() => {
        fetch('/api/sites')
            .then(res => res.json())
            .then(data => {
                setSites(data);
                saveSitesToLocal(data);
            })
            .catch(() => {
                const localSites = loadSitesFromLocal();
                setSites(localSites);
            });
    }, [saveSitesToLocal, loadSitesFromLocal]);

    // Add site
    const addSite = useCallback(async (site) => {
        try {
            const res = await fetch('/api/sites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(site)
            });
            if (res.ok) {
                const newSite = await res.json();
                setSites(sites => {
                    const updated = [...sites, newSite];
                    saveSitesToLocal(updated);
                    return updated;
                });
                return;
            }
        } catch {}
        setSites(sites => {
            const updated = [...sites, site];
            saveSitesToLocal(updated);
            return updated;
        });
    }, [saveSitesToLocal]);

    // Update site
    const updateSite = useCallback(async (idx, site) => {
        try {
            const res = await fetch(`/api/sites/${idx}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(site)
            });
            if (res.ok) {
                const updated = await res.json();
                setSites(sites => {
                    const arr = sites.map((s, i) => i === idx ? updated : s);
                    saveSitesToLocal(arr);
                    return arr;
                });
                return;
            }
        } catch {}
        setSites(sites => {
            const arr = sites.map((s, i) => i === idx ? site : s);
            saveSitesToLocal(arr);
            return arr;
        });
    }, [saveSitesToLocal]);

    // Delete site
    const deleteSite = useCallback(async (idx) => {
        try {
            const res = await fetch(`/api/sites/${idx}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setSites(sites => {
                    const arr = sites.filter((_, i) => i !== idx);
                    saveSitesToLocal(arr);
                    return arr;
                });
                return;
            }
        } catch {}
        setSites(sites => {
            const arr = sites.filter((_, i) => i !== idx);
            saveSitesToLocal(arr);
            return arr;
        });
    }, [saveSitesToLocal]);

    return { sites, setSites, addSite, updateSite, deleteSite };
}
