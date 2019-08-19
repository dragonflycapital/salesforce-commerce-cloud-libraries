'use strict';

var differenceInCalendarDays = require('./differenceInCalendarDays');
var format = require('./format');
var defaultLocale = require('./locale/en-US/index');
var subMilliseconds = require('./subMilliseconds');
var toDate = require('./toDate');
var getTimezoneOffsetInMilliseconds = require('./_lib/getTimezoneOffsetInMilliseconds/index');

/**
 * @name formatRelative
 * @category Common Helpers
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date.
 *
 * | Distance to the base date | Result                    |
 * |---------------------------|---------------------------|
 * | Previous 6 days           | last Sunday at 04:30 AM   |
 * | Last day                  | yesterday at 04:30 AM     |
 * | Same day                  | today at 04:30 AM         |
 * | Next day                  | tomorrow at 04:30 AM      |
 * | Next 6 days               | Sunday at 04:30 AM        |
 * | Other                     | 12/31/2017                |
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|number} dirtyDate - the date to format
 * @param {Date|number} dirtyBaseDate - the date to compare with
 * @param {Object} [dirtyOptions] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {string} the date in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.locale` must contain `formatRelative` property
 */
module.exports = function formatRelative(dirtyDate, dirtyBaseDate, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var date = toDate(dirtyDate);
    var baseDate = toDate(dirtyBaseDate);

    var options = dirtyOptions || {};
    var locale = options.locale || defaultLocale;

    if (!locale.localize) {
        throw new RangeError('locale must contain localize property');
    }

    if (!locale.formatLong) {
        throw new RangeError('locale must contain formatLong property');
    }

    if (!locale.formatRelative) {
        throw new RangeError('locale must contain formatRelative property');
    }

    var diff = differenceInCalendarDays(date, baseDate);

    if (isNaN(diff)) {
        throw new RangeError('Invalid time value');
    }

    var token;
    if (diff < -6) {
        token = 'other';
    } else if (diff < -1) {
        token = 'lastWeek';
    } else if (diff < 0) {
        token = 'yesterday';
    } else if (diff < 1) {
        token = 'today';
    } else if (diff < 2) {
        token = 'tomorrow';
    } else if (diff < 7) {
        token = 'nextWeek';
    } else {
        token = 'other';
    }

    var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
    var utcBaseDate = subMilliseconds(
        baseDate,
        getTimezoneOffsetInMilliseconds(baseDate)
    );
    var formatStr = locale.formatRelative(token, utcDate, utcBaseDate, options);
    return format(date, formatStr, options);
};
