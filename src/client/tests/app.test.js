import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import App from '../App';


const mockProps = {
    user: {},
    lang: 'GB',
};

describe('App snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <App {...mockProps}/>
        );

        expect(wrapper).to.matchSnapshot();
    });
});

describe('App methods', () => {
    let props;
    let sandbox;
    let component;

    before(() => {
        sandbox = sinon.createSandbox();
        props = { ...mockProps };
        component = shallow(<App {...props} />);
        sandbox.stub(component.instance(), 'setState');
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    after(() => {
        sandbox.restore();
    });

    it('should return correct state when call changeLanguage', () => {
        // const wrapper = mount(<App />);
        // expect(wrapper.find('.GB')).to.have.lengthOf(1);
        // expect(wrapper.find('.UA')).to.have.lengthOf(0);
        // wrapper.setState({ name: '.UA' });
        // expect(wrapper.find('.GB')).to.have.lengthOf(0);
        // expect(wrapper.find('.UA')).to.have.lengthOf(1);

        const expectedState = {
            lang: 'GB',
        };

        component.instance().changeLanguage('GB');
        const actualState = component.instance().setState.getCall(0).args[0]();

        sinon.assert.calledOnce(component.instance().setState);
        assert.deepStrictEqual(actualState, expectedState);


    });

    // it('should return correct state when call changeActiveModule', () => {
    //     const expectedState = {
    //         activeModule: 'login',
    //     };
    //
    //     component.instance().changeActiveModule('login');
    //     const actualState = component.instance().setState.getCall(0).args[0]();
    //
    //     sinon.assert.calledOnce(component.instance().setState);
    //     assert.deepStrictEqual(actualState, expectedState);
    // });
    //
    // it('should return correct state when call toggleTheme', () => {
    //     const expectedState = {
    //         theme: 'dark',
    //     };
    //
    //     component.instance().toggleTheme('dark');
    //     const actualState = component.instance().setState.getCall(0).args[0];
    //
    //     sinon.assert.calledOnce(component.instance().setState);
    //     assert.deepStrictEqual(actualState, expectedState);
    // });
});