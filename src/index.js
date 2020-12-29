import './style';
import { Component } from 'preact';
import { Accordion, Card, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
	state = {
		joke: ''
	};

	// eslint-disable-next-line react/sort-comp
	componentDidMount() {
		this.getJoke();
		this.interval = setInterval(() => {
			this.getJoke();
		}, 10000);
	}

	getJoke() {
		fetch('https://api.chucknorris.io/jokes/random')
			.then(res => res.json())
			.then(res => {
				this.setState({
					joke: res.value
				});
			});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	createTableContent(){
		const elements = ['one', 'two', 'three'];
		const tableSutun = [];
		let joke = this.state.joke;
		for (const [index, value] of elements.entries()) {
			tableSutun.push(
				<tr>
					<td>{index}</td>
					<td>{joke}</td>
				</tr>
			);
		}
		return tableSutun;
	}

	createTable(){
		const elements = ['one', 'two', 'three'];

		const items = [];

		for (const [index, value] of elements.entries()) {
			const varTest = this.createTableContent();
			items.push(
				<Accordion style="text-align:center;">
					<Card>
						<Card.Header style="padding: 0;">
							<Accordion.Toggle style="width: 100%; padding: 10px;" as={Button} variant="link" eventKey="0">
								{index}
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body style="padding: 0;">
								<Table style="margin-bottom: 0;" responsive="md" bordered hover>
									<thead>
										<tr>
											<th style="width: 50%;">Name</th>
											<th style="width: 50%;">Status</th>
										</tr>
									</thead>
									<tbody>
										{varTest}
									</tbody>
								</Table>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			);
		}
		return items;
	}

	render(props, state) {


		return (
			<div class="App" style="width: 70%; float: none; margin: 30px auto 0 auto;">
				{this.createTable()}
			</div>
		);
	}
}
