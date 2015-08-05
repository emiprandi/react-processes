var TableHead = React.createClass({ displayName: 'Table Head',
    render: function () {
        return React.createElement('thead', null,
            React.createElement('tr', null,
                React.createElement('th', null),
                this.props.items.map(function (obj, i) {
                    return React.createElement('th', { key: obj.id }, obj.title);
                })
            )
        );
    }
});

var TableBody = React.createClass({ displayName: 'Table Body',
    handleInfoClick: function (e) {
        e.preventDefault();
        alert('info: ' + e.target.id);
    },
    render: function () {
        var o;
        return React.createElement('tbody', null, this.props.items.works.map(function (work, i) {
            return React.createElement('tr', { key: work.id },
                React.createElement('td', null,
                    React.createElement('span', null, work.title),
                    React.createElement('a', { id: work.id, href: '#', onClick: this.handleInfoClick }, 'i')
                ),
                this.props.items.processes.map(function (col, ii) {
                    o = {
                        status: 9,
                        dataI: i,
                        dataII: 0,
                        id: 0
                    };
                    work.processes.some(function (p, iii) {
                        if (p.id_process === col.id) {
                            o.status = p.value;
                            o.dataII = iii;
                            o.id = p.id;
                            return true;
                        }
                    });
                    if (o.status === 1) {
                        return React.createElement('td', { key: col.id }, React.createElement('a', { className: 'action done', href: '#', onClick: this.props.itemAction.bind(null, o) }, '•'));
                    } else if (o.status === 0) {
                        return React.createElement('td', { key: col.id }, React.createElement('a', { className: 'action', href: '#', onClick: this.props.itemAction.bind(null, o) }, '•'));
                    } else {
                        return React.createElement('td', { key: col.id, className: 'empty' });
                    }
                }.bind(this))
            );
        }.bind(this)));
    }
});

var App = React.createClass({ displayName: 'App',
    getInitialState: function () {
        return { data: this.props.data };
    },
    componentDidMount: function () {
        // websocket/ajax conn
    },
    updateStatus: function (o, e) {
        e.preventDefault();
        var ds = this.state,
            v = o.status === 0 ? 1 : 0;

        ds.data.works[o.dataI].processes[o.dataII].value = v;
        this.setState(ds);
    },
    render: function () {
        return React.createElement('div', { id: 'app' },
            React.createElement('table', null,
                React.createElement(TableHead, { items: this.state.data.processes }),
                React.createElement(TableBody, { items: this.state.data, itemAction: this.updateStatus })
            )
        );
    }
});

React.render(React.createElement(App, { data: initialData }), document.body);
