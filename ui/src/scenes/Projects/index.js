import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
// import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import ProjectList from './components/ProjectList';
import mixpanel from 'mixpanel-browser';
import {ROLES} from '../../constants.js';
import Exam from './components/Exams/EthereumExam'
import CourseProvider from './components/Provider/CourseProvider'
class Projects extends Component {

  handleNewProjectClick = function(e) {
    e.stopPropagation();
    mixpanel.track('create_project_modal_click');
    browserHistory.push(`/projects/create`);
  };

  // TODO: move to common place
  get isBuyer() {
    return parseInt(this.props.login['role'], 10) === ROLES.BUYER
  }

  render() {
    // const actions = this.isBuyer
    //   ?
    //   <Button
    //     flat
    //     key="add_circle_outline"
    //     label="Create New Project"
    //     onClick={(e) => this.handleNewProjectClick(e)}>
    //       add_circle_outline
    //     </Button>
    //   :
    //   null;

    const projectView = this.isBuyer
      ? //if this is the student, then show this
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <Exam/>
        </div>
      </div>
      : //else if this is the course provider, then show this
      <div className="md-grid">
        <CourseProvider/>
      </div>;

    return (
      <section>
        <Toolbar
          themed
          title="Projects"
          // actions={actions}
        />
        {projectView}
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps)(Projects);
