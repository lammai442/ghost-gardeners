import type { ChangeEvent } from 'react';
import './index.scss';

type Props = {
	comment: string;
	handleChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	commentCount: number;
};

export const Comment = ({
	comment,
	commentCount,
	handleChangeComment,
}: Props) => {
	return (
		<div className="flex flex__column comment">
			<h5 className="heading-5 font-color-red text-ketchup">
				Lägg till en kommentar
			</h5>
			<p className="base">Något särskilt som vi behöver veta?</p>

			<label className="flex comment__label">
				<textarea
					rows={6}
					value={comment}
					maxLength={200}
					className="border-radius comment__textarea"
					onChange={handleChangeComment}
				/>
			</label>
			<span className="base-small comment__max-characters">
				{commentCount} av 200 tecken
			</span>
		</div>
	);
};

/**
 * Author: Klara Sköld
 * Created a textarea for comments.
 *
 */
