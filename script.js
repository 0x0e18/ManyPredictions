document.addEventListener('DOMContentLoaded', function() {
    const bidenBtn = document.getElementById('biden-btn');
    const trumpBtn = document.getElementById('trump-btn');
    const bidenCountSpan = document.getElementById('biden-count');
    const trumpCountSpan = document.getElementById('trump-count');

    // Function to update the vote counts in the DOM
    function updateCounts(bidenCount, trumpCount) {
        bidenCountSpan.textContent = bidenCount;
        trumpCountSpan.textContent = trumpCount;
    }

    // Get initial vote counts from the database
    database.ref('votes').once('value', function(snapshot) {
        const votes = snapshot.val() || { biden: 0, trump: 0 };
        updateCounts(votes.biden, votes.trump);
    });

    // Add event listeners for the buttons
    bidenBtn.addEventListener('click', function() {
        database.ref('votes/biden').transaction(function(currentCount) {
            return (currentCount || 0) + 1;
        });
    });

    trumpBtn.addEventListener('click', function() {
        database.ref('votes/trump').transaction(function(currentCount) {
            return (currentCount || 0) + 1;
        });
    });

    // Listen for changes to the vote counts
    database.ref('votes').on('value', function(snapshot) {
        const votes = snapshot.val() || { biden: 0, trump: 0 };
        updateCounts(votes.biden, votes.trump);
    });
});
