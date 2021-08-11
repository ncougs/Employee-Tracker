function Question(type, name, message, choices) {
    this.type = type,
    this.name = name,
    this.message = message,
    this.choices = choices
};

module.exports = Question;