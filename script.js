document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const bidenBtn = document.getElementById('biden-btn');
    const trumpBtn = document.getElementById('trump-btn');
    const bidenCountSpan = document.getElementById('biden-count');
    const trumpCountSpan = document.getElementById('trump-count');

    if (!bidenBtn || !trumpBtn || !bidenCountSpan || !trumpCountSpan) {
        console.error('One or more DOM elements are missing');
        return;
    }

    console.log('DOM elements found');

    // Function to update the vote counts in the DOM
    function updateCounts(bidenCount, trumpCount) {
        bidenCountSpan.textContent = bidenCount;
        trumpCountSpan.textContent = trumpCount;
        console.log('Vote counts updated:', bidenCount, trumpCount);
    }

    // Get initial vote counts from the database
    database.ref('votes').once('value', function(snapshot) {
        const votes = snapshot.val() || { biden: 0, trump: 0 };
        updateCounts(votes.biden, votes.trump);
        console.log('Initial vote counts:', votes);
    }).catch(function(error) {
        console.error('Error fetching initial votes:', error);
    });

    // Add event listeners for the buttons
    bidenBtn.addEventListener('click', function() {
        console.log('Biden button clicked');
        database.ref('votes/biden').transaction(function(currentCount) {
            return (currentCount || 0) + 1;
        }).catch(function(error) {
            console.error('Error updating Biden votes:', error);
        });
    });

    trumpBtn.addEventListener('click', function() {
        console.log('Trump button clicked');
        database.ref('votes/trump').transaction(function(currentCount) {
            return (currentCount || 0) + 1;
        }).catch(function(error) {
            console.error('Error updating Trump votes:', error);
        });
    });

    // Listen for changes to the vote counts
    database.ref('votes').on('value', function(snapshot) {
        const votes = snapshot.val() || { biden: 0, trump: 0 };
        updateCounts(votes.biden, votes.trump);
        console.log('Vote counts updated from database:', votes);
    }, function(error) {
        console.error('Error listening for vote updates:', error);
    });
});
