import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import Main from '../../Main';

const mockProps = {
    user: {},
    users: [],
    logOut: () => {},
    activeUsers: [],
    messages: [],
    addMessage: () => {},
    activeComponent: '',
    toggleTheme: () => {},
    changeActiveComponent: () => {},
};

describe('Main snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Main {...mockProps}/>
        );

        expect(wrapper).to.matchSnapshot();
    });
});

// describe('Main methods', () => {
//     let props;
//     let sandbox;
//     let component;
//
//     before(() => {
//         sandbox = sinon.createSandbox();
//         props = {
//             ...mockProps,
//             addMessage: sandbox.stub(),
//             changeActiveComponent: sandbox.stub(),
//             logOut: sandbox.stub(),
//             toggleTheme: sandbox.stub(),
//         };
//         component = shallow(<Main {...props}/>);
//     });
//
//     afterEach(() => {
//         sandbox.resetHistory();
//     });
//
//     after(() => {
//         sandbox.restore();
//     });
//
//     it('should call handleClick when clicked chatBtn', () => {
//
//         const handleClick = sinon.spy();
//         const wrapper = shallow(
//             <Main {...mockProps} />);
//         wrapper.find('#chatBtn').simulate('click');
//         expect(handleClick.called).equal(true);
//     });
//
//     it('should call handleClick when clicked chatBtn', () => {
//         const spy = sinon.spy(Main.prototype, 'handleClick');
//
//         component.find('#chatBtn').simulate('click');
//         expect(spy.calledOnce).to.equal(true);
//     });
//
//     it('should call handleClick when clicked toggleBtn', () => {
//         const spy = sinon.spy(Main.prototype, 'handleClick');
//
//         component.find('#toggleBtn').simulate('click');
//         expect(spy.calledOnce).to.equal(true);
//     });
//
//     it('should call handleClick when clicked usersBtn', () => {
//         const spy = sinon.spy(Main.prototype, 'handleClick');
//
//         component.find('#usersBtn').simulate('click');
//         expect(spy.calledOnce).to.equal(true);
//     });
// });