export default function Error({ errors }) {
  return (
    <>
      <div
        className={`${
          errors.some((error) => error != undefined) ? 'd-block' : 'd-none'
        }`}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          <small>{errors.toString()}</small>
        </div>
      </div>
    </>
  )
}
