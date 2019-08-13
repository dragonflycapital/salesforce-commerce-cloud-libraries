'use strict';

var formatRelativeLocale = {
    lastWeek: "'ئ‍ۆتكەن' eeee 'دە' p",
    yesterday: "'تۈنۈگۈن دە' p",
    today: "'بۈگۈن دە' p",
    tomorrow: "'ئەتە دە' p",
    nextWeek: "eeee 'دە' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
