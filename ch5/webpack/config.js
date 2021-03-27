module.exports = {
    entry: "./src/index.js", // 클라이언트의 시작 파일 지정
    output: {
        path: "dist/assets",
        filename: "bundle.js",
        sourceMapFilename: 'bundle.map'
    }, // 번들을 ./dist/assets/bundle.js라는 javascript 파일에 출력하라고 지정
    devtool: '#source-map', // 웹팩이 소스 매핑을 사용하게 할 수 있다.
    module: {
        rules: [ // 웹팩으로 적용할 수 있는 다양한 유형의 loader를 처리해야 하기 때문에 배열이다.
            {
                test: /\.js$/, // loader가 처리해야 하는 모듈의 파일 경로를 매치시켜주는 정규식
                exclude: /(node_modules)/, // babel-loader를 node_modules 폴더에 npm으로 설치한 파일에는 적용하지 않는다.
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true, // 난독화하면 코드를 알아볼 수 없으므로 원본과 난독화 이후 코드를 연결해주는 소스 맵
            warnings: false, // export한 번들에서 콘솔 경고 제거
            mangle: true
        })
    ]
}
