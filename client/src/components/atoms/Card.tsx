export default function Card({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="card bg-green-600">
            <div className="card-content">{children}</div>
        </div>
    );
}