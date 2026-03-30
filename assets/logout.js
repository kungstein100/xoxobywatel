// Complete logout function - clear everything and reset to index
function completeLogout() {
    console.log('Logout started');
    try {
        // Clear IndexedDB completely
        const dbName = 'cwelObywatel';
        const request = indexedDB.deleteDatabase(dbName);

        request.onsuccess = function() {
            console.log('Database deleted successfully');
            proceedWithLogout();
        };

        request.onerror = function(event) {
            console.log('Error deleting database:', event);
            proceedWithLogout();
        };

        // Also proceed with logout even if indexedDB deletion is slow
        setTimeout(proceedWithLogout, 300);

    } catch (error) {
        console.error('Logout error:', error);
        proceedWithLogout();
    }
}

function proceedWithLogout() {
    console.log('Proceeding with logout');

    // Clear all localStorage EXCEPT deviceVisited
    const deviceVisited = localStorage.getItem('deviceVisited');
    localStorage.clear();
    if (deviceVisited) {
        localStorage.setItem('deviceVisited', deviceVisited);
    }

    // Clear sessionStorage
    sessionStorage.clear();

    // Redirect to index.html
    console.log('Redirecting to index.html');
    window.location.href = 'index.html';
}