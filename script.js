document.addEventListener('DOMContentLoaded', function() {
    let bidenCount = 0;
    let trumpCount = 0;

    const bidenBtn = document.getElementById('biden-btn');
    const trumpBtn = document.getElementById('trump-btn');
    const bidenCountSpan = document.getElementById('biden-count');
    const trumpCountSpan = document.getElementById('trump-count');

    bidenBtn.addEventListener('click', function() {
        bidenCount++;
        bidenCountSpan.textContent = bidenCount;
    });

    trumpBtn.addEventListener('click', function() {
        trumpCount++;
        trumpCountSpan.textContent = trumpCount;
    });
});
