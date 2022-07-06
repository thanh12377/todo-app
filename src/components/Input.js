import { Fragment, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/material/Icon";

const Input = (props) => {
  const [job, setJob] = useState("");
  const [jobList, setJobList] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobList"));
    return storageJobs ?? [];
  });
  const handleChange = () => {
    setJobList((prev) => {
      const newJobs = [
        ...prev,
        {
          id: Math.random(),
          value: job,
          isAll: false,
          isActive: true,
          isCompleted: false,
          isChecked: false,
        },
      ];
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobList", jsonJobs);
      return newJobs;
    });
    setJob("");
  };

  const handleCheckBoxChange = (e) => {
    const index = jobList.findIndex((item) => item.id == e.target.id);

    const foundJob = jobList.find((item) => item.id == e.target.id);
    const newJobList = [...jobList];
    if (e.target.checked) {
      newJobList.splice(index, 1, {
        ...foundJob,
        isActive: false,
        isCompleted: true,
        isChecked: true,
      });
      // setCheck(true);
      // setIsCheck(true);
      // setIsActived(false);
    } else {
      newJobList.splice(index, 1, {
        ...foundJob,
        isActive: true,
        isCompleted: false,
        isChecked: false,
      });
      // setCheck(false);
      // setIsCheck(false);
      // setIsActived(true);
      // console.log('uncheck');
    }

    // const newJobList = [...jobList];
    // newJobList.splice(index, 1, {
    //   ...foundJob,
    //   isActive: check,
    //   isChecked: check,
    // });

    const jsonJobs = JSON.stringify(newJobList);
    localStorage.setItem("jobList", jsonJobs);
    setJobList(newJobList);
  };
  // console.log(jobList)
  // console.log(check);
  // const checkJobIsActive = () => {
  //   setCheck(check);
  //   console.log(jobList);

  //   const foundJob = jobList.find((job) => job.isActive === true);

  //   const newJobList = [];
  //   newJobList.push({ ...foundJob, isActive: false });
  //   setJobList(newJobList);
  // };
  const handleTrashChange = (e) => {
    const index = jobList.findIndex((item) => item.id == e);

    const newJobList = [...jobList];
    newJobList.splice(index, 1);
    const jsonJobs = JSON.stringify(newJobList);
    localStorage.setItem("jobList", jsonJobs);
    setJobList(newJobList);
    console.log(newJobList);
  };
  const handleDeleteAll = () => {
    const newJobList = [...jobList];
    setJobList(newJobList.filter((job) => job.isCompleted === false));
    const jsonJobs = JSON.stringify(
      newJobList.filter((job) => job.isCompleted === false)
    );
    localStorage.setItem("jobList", jsonJobs);
  };
  useEffect(() => {}, [props.tabId]);

  return (
    <Fragment>
      {props.tabId == "1" ? (
        <>
          <div className="inputTodo">
            <input value={job} onChange={(e) => setJob(e.target.value)} />
            <button className="addTodo" onClick={handleChange}>
              Add
            </button>
          </div>
          <div>
            <ul>
              {jobList.map((job) => (
                <div className="todoJob" id={job.id}>
                  <input
                    type="checkbox"
                    id={job.id}
                    onChange={handleCheckBoxChange}
                    checked={job.isCompleted ? true : false}
                  ></input>
                  <li
                    className={`${job.isCompleted ? "completed" : ""}`}
                    key={job.id}
                  >
                    {job.value}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </>
      ) : (
        console.log("nothing")
      )}
      {props.tabId == "2" ? (
        <>
          <div className="inputTodo">
            <input value={job} onChange={(e) => setJob(e.target.value)} />
            <button className="addTodo" onClick={handleChange}>
              Add
            </button>
          </div>
          <div>
            <ul>
              {jobList.map((job) =>
                job.isActive === true ? (
                  <>
                    <div className="todoJob" id={job.id}>
                      <input
                        type="checkbox"
                        id={job.id}
                        onChange={handleCheckBoxChange}
                      ></input>
                      <li key={job.id}>{job.value}</li>
                    </div>
                  </>
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
        </>
      ) : (
        console.log("nothing Active")
      )}
      {props.tabId == "3" ? (
        <>
          <div>
            <ul>
              {jobList.map((job) =>
                job.isCompleted === true ? (
                  <>
                    <div className="completeJob">
                      <div className="todoJob" id={job.id}>
                        <input
                          type="checkbox"
                          id={job.id}
                          onChange={handleCheckBoxChange}
                          checked={job.isCompleted ? true : false}
                        ></input>
                        <li className="completed" key={job.id}>
                          {job.value}
                        </li>
                      </div>
                      <BsTrash
                        className="trashLogo"
                        onClick={() => handleTrashChange(job.id)}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
          {
            jobList.length === 0  ? '' :
          <>
          <Button
            variant="outlined"
            startIcon={<BsTrash />}
            color="error"
            className={`deleteAllButton ${jobList.map((job) => {
              if (job.isCompleted === false) return "none";
              else return "";
            })}`} 
            onClick={handleDeleteAll}
          >
            Delete all
          </Button>
          </>
          }
        </>
      ) : (
        console.log("nothing completed")
      )}
    </Fragment>
  );
};

export default Input;
