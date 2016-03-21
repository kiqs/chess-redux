import React from 'react';

import Draggable, {DraggableCore} from 'react-draggable';

export default class FigureDraggable extends React.Component {
	constructor(props) {
		super(props);

		this.cellWidth = 90;

		this.dragOptions = {
			bounds: {
				left: -90*this.props.opts.figure.pos.x,
				top: -90*this.props.opts.figure.pos.y,
				right: 90*(7-this.props.opts.figure.pos.x), 
				bottom: 90*(7-this.props.opts.figure.pos.y)
			},
			grid: [this.cellWidth, this.cellWidth]
		};
	}

	getMoveStatus(elData, pos) {
	    var currentField = this.props.field.data[pos.y][pos.x];
	    var isValidMove = elData.figure.isValidMove(pos);
	    var oursFigure = currentField.figure ? elData.figure.color == currentField.figure.color : null;

	    if (!currentField.figure) {
	        return {id: 1, valid: isValidMove, info: "move to empty cell"};
	    } else if (!oursFigure) {
	        return {id: 2, valid: isValidMove, info: "move to enemy's cell"};
	    } else if (oursFigure) {
	        return {id: 2, valid: isValidMove, info: "move to cell with your figure"};
	    }
	}

	dropFigure(elData, e, data) {
		let transform = data.node.style.transform;
		let arr = transform.match(/(-)?\d{1,3}/g);
		let [a, b] = arr;
		let [deltaX, deltaY] = [a/90, b/90];
		var {x, y} = elData.figure.pos;
		let [newX, newY] = [x+deltaX, y+deltaY];
		this.processMoving(elData, {x: newX, y: newY});
	}

	processMoving(elData, pos) {
		var moveStatus = this.getMoveStatus(elData, pos);
		var isValidMove = moveStatus.valid;
		let oldPos = Object.assign({}, elData.figure.pos);

		if (!isValidMove) {
			this.props.repaintCell(oldPos);
		} else {
			elData.figure.move(pos);
			this.props.moveFigureToCell(oldPos, pos);
		}
	}

	render() {
		var dropFigure = this.dropFigure.bind(this, this.props.opts);

		return <Draggable onStop={dropFigure} grid={this.dragOptions.grid} bounds={this.dragOptions.bounds}>
			<div className='figure' dangerouslySetInnerHTML={{__html: this.props.opts.figure ? this.props.opts.figure.code : null}}></div>
		</Draggable>;
	}
}