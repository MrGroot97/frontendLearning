// import { Link } from 'react-router-dom';

// // override default link component for adding custom viewTransition
// class CustomLink extends Link {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         console.log("CustomLink", this.props);
//         return (
//             <Link {...this.props} />
//         )
//     }
// }

// export default CustomLink;

import { Link, useNavigate } from 'react-router-dom';

const CustomLink = ({ to, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();

    document.startViewTransition(() => {
      navigate(to);
    });
  };

  return (
    <Link to={to} onClick={handleClick} {...props} />
  );
};

export default CustomLink;