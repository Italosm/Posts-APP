import "./styles.css";

import { Component } from "react";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: "",
    loadedPosts: false,
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
      loadedPosts: true,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPostsPerPage = nextPage + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPostsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue, loadedPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;
      

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Found: {searchValue} in {filteredPosts.length} results</h1>}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {(loadedPosts === true && filteredPosts.length === 0) && (
          <div>
            <p>Not Found</p>
            <Posts posts={posts} />
          </div>
        )}
        <div className="button-container">
          {!searchValue && (
            <Button
              disabled={noMorePosts}
              text="Load more posts"
              onClick={this.loadMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
export default Home;
