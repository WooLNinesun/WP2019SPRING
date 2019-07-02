function $max(a, b) {
    return Math.max(a, b);
}

function $randomInt(max, min) {
    if (min) { return Math.floor(Math.random() * (max - min)) + min; }
    return Math.floor(Math.random() * max);
}

function $pow2(value) {
    return Math.pow(value, 2);
}

function $scale(percentage) {
    return function (img) {
        img.resize(img.width * percentage, img.height * percentage);
    };
}
