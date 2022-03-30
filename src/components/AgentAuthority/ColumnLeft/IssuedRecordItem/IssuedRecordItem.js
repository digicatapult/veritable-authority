/**
 * This function renders a single issued credential record.
 * @returns A card with the following: Header; Collapsible body;
 * Table; Details link
 */
import ReactJson from 'react-json-view'

const lookupRecordType = new Map([['2', 'A2 Open Category']])

export default function IssuedRecordItem({ record, index }) {
  return (
    <>
      <div className="card-header" id={`heading${index}`}>
        <div className="mb-0">
          <button
            className="btn btn-link text-left w-100"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse${index}`}
            aria-expanded="false"
            aria-controls={`collapse${index}`}
          >
            <span>
              <i className="fa fa-sort"></i>
              &nbsp; Issued Credential #{index + 1}
            </span>
          </button>
        </div>
      </div>
      <div
        className="collapse"
        id={`collapse${index}`}
        aria-labelledby={`heading${index}`}
        data-parent="#accordion"
      >
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>
                    <b>Flyer ID:</b>
                  </td>
                  <td>
                    {record.cred_ex_record.cred_preview.attributes[0].value}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Type:</b>
                  </td>
                  <td>
                    {lookupRecordType.get(
                      record.cred_ex_record.cred_preview.attributes[1].value
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Expiration Date:</b>
                  </td>
                  <td>
                    {record.cred_ex_record.cred_preview.attributes[2].value}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Created At:</b>
                  </td>
                  <td>{record.cred_ex_record.created_at.replace('Z', '')}</td>
                </tr>
                <tr>
                  <td>
                    <b>Update At:</b>
                  </td>
                  <td>{record.cred_ex_record.updated_at.replace('Z', '')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <a
            href={`#details${index}`}
            className="text-primary"
            data-toggle="collapse"
          >
            Details
          </a>
          <div id={`details${index}`} className="my-2 collapse">
            <div className="pre-scrollable bg-light" style={{ height: 200 }}>
              <ReactJson
                src={record}
                style={{ fontSize: '0.75em' }}
                name={'record'}
                displayDataTypes={false}
                displayObjectSize={false}
                iconStyle={'square'}
                indentWidth={2}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
