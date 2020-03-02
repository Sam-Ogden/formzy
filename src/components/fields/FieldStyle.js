const fieldStyles = {
  fieldRoot: {
    height: '60vh',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'left',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingBottom: '25vh',
    paddingTop: '25vh',
    maxWidth: '100%',
    '& input': {
      border: 0,
      borderBottom: [ [ 2, 'solid', '#555' ] ],
      backgroundColor: 'transparent',
      height: '6vh',
      width: '100%',
      fontSize: '1.4em',
      transition: 'border 0.2s',
    },
    '& input:focus': {
      outline: 'none',
      borderBottom: [ [ 2, 'solid', 'transparent' ] ],
    },
  },
  nextButton: {
    padding: [ [ 10, 20 ] ],
    fontSize: '1em',
    borderRadius: 5,
    marginRight: 10,
    cursor: 'pointer',
    fontWeight: 'bold',
    border: 'none',
    marginTop: 15,
  },
  title: {
    fontSize: '1.6em',
    marginBottom: 10,
    marginTop: '0vh',
  },
  description: {
    color: '#777',
    fontSize: '1.2em',
  },
  error: {
    marginTop: '20px',
    backgroundColor: 'indianred',
    padding: '10px',
    borderRadius: 5,
    color: 'beige',
    fontWeight: 'bold',
  },
  fieldAction: {
    display: 'flex',
    alignItems: 'baseline',
  },
  '@media (min-width: 960px)': { title: { fontSize: '2em' } },
  nextActionDescription: { '& span': { fontWeight: 'bold' } },
  fieldChildrenContainer: {},
}

export default fieldStyles
