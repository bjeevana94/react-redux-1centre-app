import React from "react"

const app_header = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor:'#38444d'
}

const menu_item = {
    float: 'left',
    color: 'white',
    padding: '14px 16px'
}

export const Header = () => {
    return (
        <div>
            <ul style={app_header}>
                <li style={menu_item}>LOGO</li>
            </ul>
        </div>
    )
}

