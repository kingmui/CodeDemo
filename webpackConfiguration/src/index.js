import './index.scss';

document.getElementById('app').innerHTML = 'hello webpack!';

if (module.hot) {
	module.hot.accept();
}