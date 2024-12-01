import {useState} from 'react';

const InputComponent = () => {
    const [commentText, setCommentText] = useState('');

    return (
        <>
            <input type="text"
                   className="grow"
                   placeholder="댓글을 입력해주세요..(최대 50자)"
                   maxLength="50"
                   value={commentText}
                   onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="button"
                    className="bg-blue-500 text-white py-2 px-6 w-1/5"
                    onClick={() => {console.log(commentText)}}
            >등록</button>
        </>
    );
};

export default InputComponent;