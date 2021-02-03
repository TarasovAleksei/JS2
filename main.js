const a = "тут написан 'какой-то' совершенно 'бредовый' текст aren't и все";
const b = a.replace(/(\b'\b)|'/g, function (p0, p1) {
        return p1 ? "'" : '"';
    });

console.log(b);

