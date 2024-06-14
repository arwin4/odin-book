export default function fadeThenNavigate(elemRef, destination, navigate) {
  elemRef.current.classList.add('fade-out');
  setTimeout(() => {
    navigate(destination);
  }, 250);
}
