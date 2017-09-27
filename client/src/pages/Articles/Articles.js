import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import APINYT from "../../utils/APINYT"
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    search : "",
    articles: []
  };

  componentDidMount() {
    this.loadArticles("apple");
  }

  loadArticles = query => {
    APINYT.search(query)
      .then(
        res => {
        this.setState({ articles: res.data.response.docs });
        // console.log(res.data.response.docs);
      }
    )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Search</h1>
            </Jumbotron>
            <div className="panel panel-primary">
              <div className="panel-heading changeme">
                <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>  Search Parameters</strong></h3>
              </div>
              <div className="panel-body">
                <form>
                  <label for="searchterm">Search Term:</label>
                  <Input name="searchterm" placeholder="Search Term" />
                  <label for="numberofrecords">Number of Records:</label>
                  <select name="numberofrecords" className="form-control" id="num-records-select">
                    <option value="1">1</option>
						      	<option value="5" selected>5</option>
                    <option value="10">10</option>
                  </select>
                  <label for="startyear">Start Year (optional):</label>
                  <Input name="startyear" placeholder="Start Year" />
                  <label for="endyear">End Year (optional):</label>
                  <Input name="endyear" placeholder="End Year" />
                  <button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search</button>
                  {"     "}
                  <button type="button" className="btn btn-default" id="clear-all"><i className="fa fa-trash"></i> Clear Results</button>

                </form>
             </div>
            </div>
          </Col>
        </Row>
        <Row>
            <Col size="md-12">
             <br />
             <div className="panel panel-primary">
               <div className="panel-heading">
                  <h3 className="panel-title"><strong><i className="fa fa-table"></i>  Top Articles</strong></h3>
              </div>
              <div className="panel-body" id="well-section">
                {this.state.articles.length ? (
                  <List>
                    {this.state.articles.map(article => (
                      <ListItem key={article.headline.main}>
                        <h3>{article.headline.main}</h3>
                        {/* <a href={"/books/" + book._id}>
                          <strong>
                            {book.title} by {book.author}
                          </strong>
                        </a> */}
                        <DeleteBtn />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                    <h3>No Results to Display</h3>
                  )}
              </div>
             </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
