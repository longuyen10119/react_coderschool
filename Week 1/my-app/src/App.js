import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fakeData from './now_playing.json';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardDeck } from 'reactstrap';
import ReactLoading from 'react-loading';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import ReactSearchBox from 'react-search-box'

class App extends Component {

  constructor(){
    super();
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      moviesList: [],
      isVisible: true,
      collapsed: true,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  sleep = m => new Promise(r => setTimeout(r,m));
  async componentDidMount () {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
    const movieData = await response.json();
    await this.sleep(1000)
    this.setState({
      moviesList: movieData.results,
      isVisible: false,

    })
  }
  refreshPage() {
    window.location.reload();
  }
  render() {
    return (
      <div className="App">
        <div>
          <Navbar color="faded" light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <NavbarBrand href="/" className="mr-auto">Flickies</NavbarBrand>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <ReactSearchBox
                  placeholder="Search"
                  value=""
                  data={this.state.moviesList}
                  callback={record => console.log(record)}
                />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
        {
          this.state.isVisible === true ? (
            <ReactLoading type={"spinningBubbles"} color={"red"} height={100} width={100} />
          ) : (
            this.state.moviesList.map(movie => {
              return(
                <Movie 
                  title={movie.title}
                  overview={movie.overview}
                  id={movie.id}
                  poster_path={movie.poster_path}
                />
              )
            })
          )
        }
      </div>
    );
  }
}
class Movie extends Component{
  render(){
    const moviePath = 'https://image.tmdb.org/t/p/w342' + this.props.poster_path;
    return (
      
      <Card id={this.props.id} body outline color="secondary" inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <CardImg top width={100} height={200} src={moviePath} alt="Card image cap" />
        <CardBody>
          <CardTitle><h3>{this.props.title}</h3></CardTitle>
          <CardSubtitle>{this.props.overview}</CardSubtitle>
        </CardBody>
      </Card>
    )
  }
}
export default App;
