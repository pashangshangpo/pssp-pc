const urlTo = require('url');
const mime = require('mime');
const fse = require('fs-extra');
const Router = require('koa-router');
const router = new Router();
const {resolveApp} = require('../../config/paths');

module.exports = (app, server, staticPath) => {
	router.all('*', async cxt => {
		let url = cxt.url;
		let path = '';

		if (url === '/' || url === '') {
			path = '/index.html';
		} else {
			path = url;
		}

		path = resolveApp(staticPath, urlTo.parse(path).pathname);

		if (!fse.existsSync(path)) {
			cxt.body = {
        status: 'ok'
      };
		} else {
			let type = 'text/plain';
			try {
				type = mime.lookup(path);
			} catch (err) {}

			// 低版本ie浏览器不认识application/javascript, 会当成文件来下载
			if (type === 'application/javascript') {
				type = 'text/plain';
			}

			cxt.set('Content-type', type);
			cxt.body = fse.readFileSync(path);
		}
	});

	app.use(router.routes());
};
