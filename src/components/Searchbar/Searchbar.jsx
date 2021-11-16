import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';

export default class Searchbar extends Component {
  static propTypes = {
    getOnSubmit: PropTypes.func.isRequired,
  };
  state = {
    query: '',
  };
  handleQueryForm = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitQueryForm = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.warn('Please enter text', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    this.props.getOnSubmit(this.state.query.toLowerCase());
    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.submitQueryForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            name="query"
            value={query}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryForm}
          />
        </form>
      </header>
    );
  }
}
