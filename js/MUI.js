import React, {Component} from 'react'
import _mui from 'material-ui'

var ThemeManager = new _mui.Styles.ThemeManager()
ThemeManager.setTheme(ThemeManager.types.LIGHT)

export class UI extends React.Component {
    getChildContext() {
        return {muiTheme: ThemeManager.getCurrentTheme()}
    }
}

UI.childContextTypes = {
	muiTheme: React.PropTypes.object
}

export const ui = _mui
 