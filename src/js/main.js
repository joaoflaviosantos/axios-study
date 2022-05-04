const statusEl = document.getElementById('status');
const dataEl = document.getElementById('data');
const headersEl = document.getElementById('headers');
const configEl = document.getElementById('config');

const get = () => {

	// axios({method: "get", url: "https://jsonplaceholder.typicode.com/posts?_limit=5"})

	const config = {
			params: {
					_limit: 5,
			},
		};

	axios.get("https://jsonplaceholder.typicode.com/posts/", config)
			.then((response) => renderOutput(response));

}

const post = () => {

	const data = {
    title: 'Vue3',
    body: 'bar',
    userId: 1,
  };

	axios.post("https://jsonplaceholder.typicode.com/posts/", data)
			.then((response) => renderOutput(response));
}

const put = () => {

	let id = 5

	const data = {
		//id: id,
    title: 'Sunt Aut Facere Occaecati Excepturi Optio Reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto, quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut',
    userId: 1,
  };

	axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data)
			.then((response) => renderOutput(response));
}

const patch = () => {

	let id = 5

	const data = {
		//id: id,
    title: 'Django',
  };

	axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, data)
			.then((response) => renderOutput(response));
}

const del = () => {

	let id = 1

	axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((response) => renderOutput(response));
}

const multiple = () => {
  
	//axios.all();
	
	Promise.all([
		axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
		axios.get("https://jsonplaceholder.typicode.com/users?_limit=5"),
		axios.get("https://jsonplaceholder.typicode.com/albums?_limit=5")
	]).then((response) => {

		//console.log(response[0].data)
		//console.log(response[1].data)
		//console.log(response[2].data)
		console.table(response[0].data)
		console.table(response[1].data)
		console.table(response[2].data)

	})

}

const transform = () => {

	const config = {
		params: {
				_limit: 5,
		},

	// `transformResponse` permite mudar os dados da responsta antes de ser passado para o then/catch
	 transformResponse: [function (data) {
		// Faça o que quiser para transformar os dados
		const payload = JSON.parse(data).map(o => {
			return {
				//title: o.title,
				...o,
				is_selected: true,
			};
		});
		return payload;
	  }],
	};

	axios.get("https://jsonplaceholder.typicode.com/posts/", config)
			.then((response) => renderOutput(response));
}

const errorHandling = () => {

	axios.get("https://jsonplaceholder.typicode.com/postsz/")
	.then((response) => renderOutput(response))
	.catch((error) => {
		renderOutput(error.response);

		console.log(error.response);
		console.log(error.response.data);
		console.log(error.response.headers);
		console.log(error.message);
		console.log(error.response.status);
		console.log(error.response.statusText);
	});
}

const cancel = () => {

	const controller = new AbortController();

	const config = {
		params: {
				_limit: 5,
		},
		signal: controller.signal
	};

	axios.get("https://jsonplaceholder.typicode.com/posts/", config)
		.then((response) => renderOutput(response))
		.catch((error) => {
			console.log(error.response);
			console.log(error.message);
		});

	// cancel the request
	controller.abort();
}

const clear = () => {
    statusEl.innerHTML = '';
    statusEl.className = '';
    dataEl.innerHTML = '';
    headersEl.innerHTML = '';
    configEl.innerHTML = '';
}

const renderOutput = (response) => {
    // Status
    const status = response.status;
    statusEl.removeAttribute('class');
    let statusElClass = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium';
    if (status >= 500) {
        statusElClass += ' bg-red-100 text-red-800';
    } else if (status >= 400) {
        statusElClass += ' bg-yellow-100 text-yellow-800';
    } else if (status >= 200) {
        statusElClass += ' bg-green-100 text-green-800';
    }

    statusEl.innerHTML = status;
    statusEl.className = statusElClass;

    // Data
    dataEl.innerHTML = JSON.stringify(response.data, null, 2);
    Prism.highlightElement(dataEl);

    // Headers
    headersEl.innerHTML = JSON.stringify(response.headers, null, 2);
    Prism.highlightElement(headersEl);

    // Config
    configEl.innerHTML = JSON.stringify(response.config, null, 2);
    Prism.highlightElement(configEl);
}

document.getElementById('get').addEventListener('click', get);
document.getElementById('post').addEventListener('click', post);
document.getElementById('put').addEventListener('click', put);
document.getElementById('patch').addEventListener('click', patch);
document.getElementById('delete').addEventListener('click', del);
document.getElementById('multiple').addEventListener('click', multiple);
document.getElementById('transform').addEventListener('click', transform);
document.getElementById('cancel').addEventListener('click', cancel);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('clear').addEventListener('click', clear);
