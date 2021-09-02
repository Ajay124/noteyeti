import React, { Component } from "react";
class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        this.props.handlePaginationChange(i);
    }

    render() {
        let previousDisable = this.props.paginationVariable.page == 0 ? 'disabled' : '';
        let nextDisable = this.props.paginationVariable.page == this.props.paginationVariable.total_pages-1 ? 'disabled' : '';
        let items = [];
        console.log(items);
        for ( let i = 0; i <= this.props.paginationVariable.total_pages-1; i++ ) {
            let active='';
            if ( this.props.paginationVariable.page == i ) {
                active='active';
            }
            if ( this.props.paginationVariable.total_pages > 10 ) {
                //if ( i <= 0 || (this.props.paginationVariable.page && i >= this.props.paginationVariable.page - 2 && i <= this.props.paginationVariable.page + 2) || i > this.props.paginationVariable.total_pages - 0 ) {
                if ( i > this.props.paginationVariable.page + 2 ) {
                    if ( this.props.paginationVariable.total_pages - i < 4 ) {
                        items.push(<li className={'page-item '+active }>
                            <a className="page-link" href="#!" value={i} onClick={() => this.handleClick(i)}>{i+1}</a>
                        </li>)
                    } else {
                        items.push(<li className={'page-item '+active }>
                            . 
                        </li>)
                    }
                } else {
                    if ( i > this.props.paginationVariable.page - 2 ) {
                        items.push(<li className={'page-item '+active }>
                            <a className="page-link" href="#!" value={i} onClick={() => this.handleClick(i)}>{i+1}</a>
                        </li>)
                    }
                }
            } else {
                items.push(<li className={'page-item '+active }>
                        <a className="page-link" href="#!" value={i} onClick={() => this.handleClick(i)}>{i+1}</a>
                    </li>)
            }
        }
        if ( this.props.paginationVariable.total_pages  > 1 ) {
            return (
                <React.Fragment>
                                <div class="card-footer py-4">
                        <nav aria-label="...">
                            <ul class="pagination justify-content-end mb-0">
                                <li className={'page-item '+ previousDisable }>
                                    <a class="page-link" href="#!" onClick={() => this.handleClick(this.props.paginationVariable.page-1)} tabindex="-1">
                                    <i class="fas fa-angle-left"></i>
                                    <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                {items}
                                <li className={'page-item '+ nextDisable }>
                                    <a class="page-link" href="#!" onClick={() => this.handleClick(this.props.paginationVariable.page+1)} >
                                    <i class="fas fa-angle-right"></i>
                                    <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </React.Fragment>
            );
        } else {
            return '';
        }
    }
  }
  
  export default Pagination;