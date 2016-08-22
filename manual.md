# はじめに

`OpenToonz` では ECMAScript (JavaScript) で、うんぬん

# スクリプト

## 最初のスクリプト

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

### `Image`

画像を表現するオブジェクト。
`tlv`、`pli` あるいは一般の画像ファイルを扱える。
`view(image)` (画像用の `print()` みたいなもの) で可視化できる。

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

### `Level`

レベル (`Image` を複数含む) を表現するオブジェクト。
`tlv`、`pli` あるいは一般の画像ファイルを扱える。
`view(level)` で可視化できる。

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

### `Transform`

幾何変換を表現するオブジェクト。

| メソッド | 内容 |
| --- | --- |
| `transform = new Transform()` | コンストラクタ |
| `transform.translate(dx, dy)` | `transform` を `(dx, dy)` だけ並進移動する `Transform` を返す |
| `transform.rotate(degrees)` | `transform` を `degree` だけ回転変換する `Transform` を返す |
| `transform.scale(s)` | `transform` を `s` だけ拡大縮小する `Transform` を返す |
| `transform.scale(sx, sy)` | `transform` を `(sx, sy)` だけ拡大縮小する `Transform` を返す |

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

### `CenterlineVectorizer `

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

### `Renderer`

シーン、セル、画像をレンダリングする。

| メソッド | 内容 |
| --- | --- |
| `r = new Renderer()` | コンストラクタ |
| `r.renderScene(scene)` | 指定された属性に従って `scene` をレンダリングして、結果の `Level` を返す |
| `r.renderFrame(scene, frameIndex)` | 指定された属性に従って `scene` の `frameIndex` をレンダリングして、結果の `Image` を返す |

| 属性 | 内容 |
| --- | --- |
| `r.columns` | レンダリングしたいタイムシートの列番号の配列 |
| `r.frames` | レンダリングしたいタイムシートの行番号の配列 |
