;(() => {
	// make puzzle pieces and board
	const navButtons = document.querySelectorAll('#buttonHolder img'),
	  puzzlePiece = document.querySelectorAll('.puzzle-pieces img'),
	  dropZones = document.querySelectorAll('.drop-zone'),
	  puzzleBoard = document.querySelector('.puzzle-board')
  
	// names of the images
	const pieces = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
  
	//functions
	function changeImageSet() {
	  //reset the game
	  for (let i = 1; i < puzzleBoard.children.length; i++) {
		const element = puzzleBoard.children[i]
		if (element.firstChild) {
		  const removedPuzzlePiece = element.removeChild(element.firstChild)
		  document.querySelector('.puzzle-pieces').appendChild(removedPuzzlePiece)
		}
	  }
  
	  // make thumbnail images on the left match the buttons
	  pieces.forEach((piece, index) => {
		puzzlePiece[index].src = `images/${piece + this.dataset.puzzleindex}.jpg`
		puzzlePiece[index].id = `${piece + this.dataset.puzzleindex}`
	  })
  
	  // give the dropzone a background image
	  // debugger;
	  puzzleBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleindex}.jpg)`
	}
  
	function dragStart(event) {
	  console.log('started a drag')
  
	  // capture the id of the element we're dragging
	  // the dataTransfer object is part of the drag event -> you can use this
	  // to temporarily store data you can retieve and use later
	  // like an audio track
	  event.dataTransfer.setData('text/plain', this.id)
	}
  
	function allowDrag(event) {
	  event.preventDefault()
	  console.log('you dragged something onto me!')
	}
  
	function allowDrop(event) {
	  console.log('you dropped something on me')
  
	  let currentPiece = event.dataTransfer.getData('text/plain')
   // check if the board has children already
	  if (
		event.target.children.length === 0 &&
		!event.target.classList.contains('puzzle-image')
	  ) {
		event.target.appendChild(document.querySelector(`#${currentPiece}`))
	  } else {
		return
	  }
	}
  
	// event handling for navButtons
	navButtons.forEach(button => button.addEventListener('click', changeImageSet))
  
	// drag event for puzzle pieces
	puzzlePiece.forEach(piece => piece.addEventListener('dragstart', dragStart))
  
	// dragover event for our drop Zones
	dropZones.forEach(zone => zone.addEventListener('dragover', allowDrag))
	dropZones.forEach(zone => zone.addEventListener('drop', allowDrop))
	changeImageSet.call(navButtons[0])
  })()
  