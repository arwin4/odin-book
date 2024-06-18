export default function fadeThenNavigate(elemRef, destination, navigate) {
  elemRef.current.classList.add('fade-out');
  setTimeout(() => {
    navigate(destination);
    elemRef.current.classList.remove('fade-out');
  }, 250);
}
