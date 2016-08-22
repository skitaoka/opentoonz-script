// sceneFile: シーンファイルパス
// blinkCount: 瞬目数
// eyeColumn: 目レベルの列番号
/** 実行例
    eye.js を `stuff/library/scripts/` に配置して、`Script Console` から下記の内容を入力する。

    sceneFile = "C:/OpenToonz 1.1 stuff/sandbox/scenes/eye.tnz";
    blinkCount = 20;
    eyeColumn = 2;
    run("eye.js");
*/
(function() {
    var path = new FilePath(sceneFile);
    var scene = new Scene(path);

    var col = eyeColumn - 1;
    if ((col < 0) || (col >= scene.columnCount)) {
        warning("out of bound eyeColumn:", eyeColumn);
        return;
    }

    var eyeLevel = scene.getCell(0, col).level;
    for (var row = 0; row < scene.frameCount; row++) {
        scene.setCell(row, col, eyeLevel, 1);
    }
    for (var i = 0; i < blinkCount; ++i) {
        var row = Math.floor(scene.frameCount * (i + Math.random()) / blinkCount);
        scene.setCell(row, col, eyeLevel, 2);
    }

    scene.save(path.withName(path.name + "_eye"));
})();
true
