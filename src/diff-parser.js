(function(ctx, undefined) {
  var utils = require('./utils.js').Utils;
    INSERTS: 'd2h-ins',
    DELETES: 'd2h-del',
    INSERT_CHANGES: 'd2h-ins d2h-change',
    DELETE_CHANGES: 'd2h-del d2h-change',
    CONTEXT: 'd2h-cntx',
    INFO: 'd2h-info'
  DiffParser.prototype.generateDiffJson = function(diffInput) {
    var files = [];
    var currentFile = null;
    var currentBlock = null;
    var oldLine = null;
    var newLine = null;
    var saveBlock = function() {
      /* Add previous block(if exists) before start a new file */
    var saveFile = function() {
       * Add previous file(if exists) before start a new one
    var startFile = function() {
      /* Create file structure */
    var startBlock = function(line) {
        currentFile.isCombined = false;
        currentFile.isCombined = true;
        currentFile.isCombined = false;
      /* Create block metadata */
    var createLine = function(line) {
      var newLinePrefixes = !currentFile.isCombined ? ['+'] : ['+', ' +'];
      var delLinePrefixes = !currentFile.isCombined ? ['-'] : ['-', ' -'];

      /* Fill the line data */
      if (utils.startsWith(line, newLinePrefixes)) {
      } else if (utils.startsWith(line, delLinePrefixes)) {
    var diffLines = diffInput.split('\n');

    /* Diff */
    var oldMode = /^old mode (\d{6})/;
    var newMode = /^new mode (\d{6})/;
    var deletedFileMode = /^deleted file mode (\d{6})/;
    var newFileMode = /^new file mode (\d{6})/;

    var copyFrom = /^copy from (.+)/;
    var copyTo = /^copy to (.+)/;

    var renameFrom = /^rename from (.+)/;
    var renameTo = /^rename to (.+)/;

    var similarityIndex = /^similarity index (\d+)%/;
    var dissimilarityIndex = /^dissimilarity index (\d+)%/;
    var index = /^index ([0-9a-z]+)..([0-9a-z]+) (\d{6})?/;

    /* Combined Diff */
    var combinedIndex = /^index ([0-9a-z]+),([0-9a-z]+)..([0-9a-z]+)/;
    var combinedMode = /^mode (\d{6}),(\d{6})..(\d{6})/;
    var combinedNewFile = /^new file mode (\d{6})/;
    var combinedDeletedFile = /^deleted file mode (\d{6}),(\d{6})/;

    diffLines.forEach(function(line) {
      if (!line || utils.startsWith(line, '*')) {
      if (utils.startsWith(line, 'diff')) {
      } else if (currentFile && !currentFile.oldName && (values = /^--- [aiwco]\/(.+)$/.exec(line))) {
        currentFile.language = getExtension(currentFile.oldName, currentFile.language);
      } else if (currentFile && !currentFile.newName && (values = /^\+\+\+ [biwco]?\/(.+)$/.exec(line))) {
        currentFile.language = getExtension(currentFile.newName, currentFile.language);
      } else if (currentFile && utils.startsWith(line, '@@')) {
      } else if ((values = oldMode.exec(line))) {
        currentFile.oldMode = values[1];
      } else if ((values = newMode.exec(line))) {
        currentFile.newMode = values[1];
      } else if ((values = deletedFileMode.exec(line))) {
        currentFile.deletedFileMode = values[1];
      } else if ((values = newFileMode.exec(line))) {
        currentFile.newFileMode = values[1];
      } else if ((values = copyFrom.exec(line))) {
        currentFile.oldName = values[1];
        currentFile.isCopy = true;
      } else if ((values = copyTo.exec(line))) {
        currentFile.newName = values[1];
        currentFile.isCopy = true;
      } else if ((values = renameFrom.exec(line))) {
        currentFile.oldName = values[1];
        currentFile.isRename = true;
      } else if ((values = renameTo.exec(line))) {
        currentFile.newName = values[1];
        currentFile.isRename = true;
      } else if ((values = similarityIndex.exec(line))) {
        currentFile.unchangedPercentage = values[1];
      } else if ((values = dissimilarityIndex.exec(line))) {
        currentFile.changedPercentage = values[1];
      } else if ((values = index.exec(line))) {
        currentFile.checksumBefore = values[1];
        currentFile.checksumAfter = values[2];
        values[2] && (currentFile.mode = values[3]);
      } else if ((values = combinedIndex.exec(line))) {
        currentFile.checksumBefore = [values[2], values[3]];
        currentFile.checksumAfter = values[1];
      } else if ((values = combinedMode.exec(line))) {
        currentFile.oldMode = [values[2], values[3]];
        currentFile.newMode = values[1];
      } else if ((values = combinedNewFile.exec(line))) {
        currentFile.newFileMode = values[1];
      } else if ((values = combinedDeletedFile.exec(line))) {
        currentFile.deletedFileMode = values[1];
  function getExtension(filename, language) {
    var nameSplit = filename.split('.');
    if (nameSplit.length > 1) {
      return nameSplit[nameSplit.length - 1];
    } else {
      return language;
    }
  module.exports['DiffParser'] = new DiffParser();
