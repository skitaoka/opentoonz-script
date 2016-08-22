# はじめに

`OpenToonz` では ECMAScript (JavaScript) で、うんぬん

# 最初のスクリプト

メニューバーの `File > Open Script Console...` をクリックすると、スクリプトコンソールを立ち上げられる。

コンソールに

```
print("Hello", ", ", "World", "!") 
```

と入力すると `Hello , World !` と表示される。

上記の内容を `hello.js` として保存して、そのファイルを `$OPENTOONZ_STUFF\library\scripts` に置くと、コンソール上で

```
run("hello.js")
```

として実行できる。また、フルパスで記述すると任意の場所に置いたスクリプトを実行できる。
あるいは、メニューバーの `File > Run Script...` からファイルを選択して実行できる。

# 定義

## 定数

`ToonzVersion`

## オブジェクト

### `FilePath`

ファイルパスを表現するオブジェクト。

| メソッド | 内容 |
| --- | --- |
| `path = new FilePath(filename)` | コンストラクタ。引数で与えられた `filename` (`String`) のパスを表現する |
| `path.withExtension(e)` | `path` で表現されるパスの拡張子を `e` (`String`) に置き換えた `FilePath` を返す |
| `path.withName(n)` | `path` で表現されるパスのファイル名を `n` (`String`) に置き換えた `FilePath` を返す |
| `path.withParentDirectory(d)` | `path` で表現されるパスの親ディレクトリまでのパスを `d` (`String`) に置き換えた `FilePath` を返す |
| `path.concat(f)` | `path` で表現されるパスに `f` (`FilePath` あるいは `String`) をつないだ `FilePath` を返す |
| `path.files()` | `path` がディレクトリを表現しているとき、含まれるフィルのパスを `FilePath` の配列で返す |

| 属性 | 内容 | 備考 |
| --- | --- | --- |
| `path.extension` | 拡張子 | Read / Write |
| `path.name` | ファイル名 | Read / Write |
| `path.parentDirectory` | 親ディレクトリ | Read / Write |
| `path.lastModified` | 拡張子 | Read Only |
| `path.exists` | パスで表現するファイルかディレクトリが存在するか | Read Only |
| `path.isDirectory` | パスがディレクトリを指しているか | Read Only |

#### サンプル

```math
rootPath = new FilePath("c:/Users/usernam");
files = rootPath.files();
for (var i in files) {
    print(files[i]);
}

file = rootPath.concat("tests").concat("filename.0001.tif);
print(file.extension);        //=> tif
print(file.name);             //=> filename
print(file.parentDirectory);  //=> filename
if (file.exists) {
  print("the file", file, "exists");

  date = new Date().getTime() - file.lastModified.getTime();
  date.setDate(date.getDate() - 1);
  if (file.lastModified >= date) {
      print("the file modified in the last 24 hours");
  }
} else {
  print("the file", file, "does not exists");
}
```

### `Image`

画像を表現するオブジェクト。
`tlv`、`pli` あるいは一般の画像ファイルを扱える。
`view(image)` (画像用の `print()` みたいなもの) で内容を表示できる。

| メソッド | 内容 |
| --- | --- |
| `image = new Image()` | 空の画像を構築する |
| `image = new Image(filename)` | コンストラクタ。引数で与えられた `filename` (`String`) の画像を読み込む |
| `image.load(filename)` | `filename` (`String`) の画像を読み込む |
| `image.save(filename)` | `filename` (`String`) に画像を保存する |

| 属性 | 内容 | 備考 |
| --- | --- | --- |
| `image.width` | 幅 (`pli` のときは `0` となる) | Read Only |
| `image.height` | 高さ (`pli` のときは `0` となる) | Read Only |
| `image.dpi` | DPI (`pli` のときは `0` となる) | Read Only |
| `image.type` | 画像タイプ: `"Empty"` or `"Raster"` or `"ToonzRaster"` or `"Vector"` | Read Only |

#### サンプル

```math
image = new Image("c:/path/to/images/A.0003.tif");
print(image.width, image.height, image.dpi);
view(image);

image = new Image("c:/path/to/image/A.pli"); // 最初のフレームだけ読み込まれる
view(image);
```

### `Level`

レベル (`Image` を複数含む) を表現するオブジェクト。
`tlv`、`pli` あるいは一般の画像ファイルを扱える。
`view(level)` で内容を表示できる。

| メソッド | 内容 |
| --- | --- |
| `level = new Level()` | 空のレベルを構築する |
| `level = new Level(filename)` | コンストラクタ。引数で与えられた `filename` (`String`) のレベルを読み込む |
| `level.load(filename)` | `filename` (`String`) のレベルを読み込む |
| `level.save(filename)` | `filename` (`String`) にレベルを保存する |
| `level.getFrameIds()` | `frameId` の配列を取得する |
| `level.getFrame(frameId)` | `frameId` に対応する `Image` を取得する。存在しないときは `undefined` になる |
| `level.getFrameByIndex(index)` | `index` 番目の `Image` を取得する。`index` は `[0, level.frameCount)` の範囲が有効 |
| `level.setFrame(frameId, image)` | `frameId` に `image` を設定する |

| 属性 | 内容 | 備考 |
| --- | --- | --- |
| `level.name` | レベル名 | Read / Write |
| `level.path` | ファイルパス | Read / Write |
| `level.frameCount` | フレーム数 | Read Only |
| `level.type` | レベルタイプ: `"Empty"` or `"Raster"` or `"ToonzRaster"` or `"Vector"` | Read Only |

#### サンプル

```math
// 逆順にする
inLevel = new Level("c:/path/to/images/A.pli");
outLevel = new Level();
for (var i = 0, fids = inLevel.getFrameIds(); i < fids.length; i++) {
    outLevel.setFrame(fids[i], inLevel.getFrame(fids[fids.length - 1 - i]));
}
outLevel.save("c:/path/to/images/A.pli");
view(outLevel);
```

### `Scene`

シーンを表現するオブジェクト。

| メソッド | 内容 |
| --- | --- |
| `scene = new Scene()` |  |
| `scene = new Scene(filename)` | コンストラクタ。引数で与えられた `filename` (`String`) のシーンを読み込む |
| `scene.load(filename)` | `filename` (`String`) のシーンを読み込む |
| `scene.save(filename)` | `filename` (`String`) にシーンを保存する |
| `scene.setCel(row, col, cell)` | タイムシートの `row` 行 `col` 列にセルを設定する。`cell` は、レベル `level` (`Level`) とその中の フレーム番号 `fid` (整数) をプロパティとしてもつ `Object`。削除したいときは、`cell` に `undefined` を指定する |
| `scene.getCel(row, col)` | タイムシートの `row` 行 `col` 列のセルを取得する |
| `scene.insertColumn(col)` | タイムシートに `col` 列を追加する |
| `scene.deleteColumn(col)` | タイムシートの `col` 列を削除する |
| `scene.getLevels()` | シーンに含まれるすべてのレベルを配列として取得する |
| `scene.newLevel(type, name)` | あたらしくレベルを作成して返す。`type` は "Raster" or "ToonzRaster" or "Vector" を指定する。 |
| `scene.loadLevel(name, path)` | `name` としてレベルを `path` (絶対パス) から読み込む |

| 属性 | 内容 | 備考 |
| --- | --- | --- |
| `scene.frameCount` | タイムシートの行数 | Read Only |
| `scene.columnCount` | タイムシートの列数 | Read Only |

#### サンプル

```
// A,B,C のレベルを並べた新規シーンを作る
scene = new Scene();

var levelNames = ["A", "B", "C"];
for (var col = 0; col < levelNames.length; col++) {
    level = scene.load(levelNames[col], "c:/path/to/images/" + levelNames[col] + ".pli");
    fids = level.getFrameIds();
    for (var row = 0; row < fids.length; row++) {
        scene.setCeill(row, col, level.fids[i]);
    }
}

scene.save("c:/path/to/scenes/test.tnz");
```

### `Transform`

幾何変換を表現するオブジェクト。

| メソッド | 内容 |
| --- | --- |
| `transform = new Transform()` | コンストラクタ |
| `transform.translate(dx, dy)` | `transform` を `(dx, dy)` だけ並進移動する `Transform` を返す |
| `transform.rotate(degrees)` | `transform` を `degree` だけ回転変換する `Transform` を返す |
| `transform.scale(s)` | `transform` を `s` だけ拡大縮小する `Transform` を返す |
| `transform.scale(sx, sy)` | `transform` を `(sx, sy)` だけ拡大縮小する `Transform` を返す |


#### サンプル

```
transform = new Transform().rotate(45).translate(10, 2);
print(transform)
```

### `ImageBuilder`

画像を生成するビルダーオブジェクト。

| メソッド | 内容 |
| --- | --- |
| `builder = new ImageBuilder()` | コンストラクタ |
| `builder = new ImageBuilder(xres, yrex)` | コンストラクタ。解像度を指定して画像を生成する |
| `builder.add(image)` | 画像を描画 |
| `builder.add(image, transofrm)` | 変換を指定して画像を描画 | 
| `builder.fill(color)` | `color` で塗りつぶす |

| 属性 | 内容 |
| --- | --- |
| `builder.image` | 結果画像 |

#### サンプル

```
builder = new ImageBuilder(800, 800);

image = new Image("c:/path/to/images/A.0001.tif");
scale = 1;
phi = 0;
for (var i = 0; i <= 20; i++) {
    transform = new Transform().scale(scale).translate(0, -200).rotate(phi);
    builder.add(image, transform);
    phi -= scale * 30;
    scale *= 0.9;
}

view(builder.image);
```

### `OutlineVectorizer`

アウトラインアルゴリズムで、ラスター画像をベクター画像に変換する。

| メソッド | 内容 |
| --- | --- |
| `v = new OutlineVectorizer()` | コンストラクタ |
| `v.vectorize(level)` | 指定された属性に従って `level` をベクター画像化する |
| `v.vectorize(image)` | 指定された属性に従って `image` をベクター画像化する |

| 属性 | 内容 |
| --- | --- |
| `v.accuracy` | 精度 |
| `v.despeckling` | ノイズ除去パラメータ |
| `v.preservePaintedAreas` | 塗り領域を保存するか？ 真偽値フラグ |
| `v.cornerAdherence` | |
| `v.cornerAngle` | |
| `v.maxColors` | 最大色数 |
| `v.transparentColor` | 抜き色 | 
| `v.toneThreshold` | 閾値 |

#### サンプル

```
a = new Image("c:/path/to/images/A.tif");

v = new OutlineVectorizer();
v.preservePaintedAreas = true;
view(v.vectorize(a));
```

### `CenterlineVectorizer`

中心線アルゴリズムで、ラスター画像をベクター画像に変換する。

| メソッド | 内容 |
| --- | --- |
| `v = new CenterlineVectorizer()` | コンストラクタ |
| `v.vectorize(level)` | 指定された属性に従って `level` をベクター画像化する |
| `v.vectorize(image)` | 指定された属性に従って `image` をベクター画像化する |

| 属性 | 内容 |
| --- | --- |
| `v.threshold` | 閾値 |
| `v.accuracy` | 精度 |
| `v.despeckling` | ノイズ除去パラメータ |
| `v.maxThickness` | 最大厚み |
| `v.thicknessCalibration` | 厚みの調整パラメータ |
| `v.preservePaintedAreas` | 塗り領域を保存するか？ 真偽値フラグ |
| `v.addBorder` | 境界線を追加するか？ 真偽値フラグ |

#### サンプル

```
a = new Image("c:/path/to/images/A.tif");

v = new CenterlineVectorizer();
v.preservePaintedAreas = true;
view(v.vectorize(a));
```

### `Rasterizer`

ベクター画像をラスター画像に変換する。

| メソッド | 内容 |
| --- | --- |
| `r = new Rasterizer()` | コンストラクタ |
| `r.rasterize(image)` | 指定された属性に従って `image` をラスター画像化する |

| 属性 | 内容 |
| --- | --- |
| `r.colorMapped` | `true` に設定すると、結果が `ToonzRaster` になる |
| `r.xres` | 横方向の解像度 |
| `r.yres` | 縦方向の解像度 |
| `r.dpi` | DPI |

#### サンプル

```
a = new Level("c:/path/to/images/A.pli");

r = new Rasterizer();
r.xres = 768;
r.yres = 576;
r.dpi = 40;
r.colorMapped = true;
view(r.rasterize(a));
```

### `Renderer`

シーン、レベル、画像をレンダリングする。

| メソッド | 内容 |
| --- | --- |
| `r = new Renderer()` | コンストラクタ |
| `r.renderScene(scene)` | 指定された属性に従って `scene` をレンダリングして、結果の `Level` を返す |
| `r.renderFrame(scene, frameIndex)` | 指定された属性に従って `scene` の `frameIndex` をレンダリングして、結果の `Image` を返す |

| 属性 | 内容 |
| --- | --- |
| `r.columns` | レンダリングしたいタイムシートの列番号の配列 |
| `r.frames` | レンダリングしたいタイムシートの行番号の配列 |

#### サンプル

```
scene = new Scene("c:/path/to/scenes/test.tnz");

r = new Renderer();
output = r.renderScene(scene);
output.save("c:/path/to/outputs/test..tif");
```
